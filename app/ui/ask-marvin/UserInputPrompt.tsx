"use client";

import { ChatQuestionAnswerUnitType, MarvinChatState } from "@/app/lib/definitions";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";

// import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

export default function UserInputPrompt(props: MarvinChatState): JSX.Element {
  const { chat_question, set_chat_question, chatQuestionAnswerUnits, setChatQuestionAnswerUnits, setHasUpdate, setHasError, setErrorMessage } = props;
  const [sessionUserName, setSessionUserName] = useState<string | null>("");
  const [sessionUserEmail, setSessionUserEmail] = useState<string | null>("");
  // const { data: session } = useSession();
  const [promptHasText, setPromptHasText] = useState<string>("inherit");
  const inputQuestionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [textLength, setTextLength] = useState<number>(0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (session) {
  //     if (session.user) {
  //       const loggedinusername: string = session.user.name!;
  //       setSessionUserEmail(session.user.email!);
  //       if (loggedinusername.indexOf(" ") > 0) {
  //         const username = session.user.name?.substring(0, session.user.name.indexOf(" "))!;
  //         setSessionUserName(username);
  //       } else {
  //         setSessionUserName(loggedinusername);
  //       }
  //     }
  //   }
  // }, [session]);

  async function askQuestionToMarvin(question: string) {
    set_chat_question(question);
    setHasError(false);
    setErrorMessage("");

    setDataLoading(true);

    const entry = {
      question: question,
      user_email: sessionUserEmail,
    };
    // send async request to server to update the wiki entry
    const api_url: string = `${process.env.NEXT_PUBLIC_DARWIN_API_HOST}/api/v1/marvin/ask-marvin/`;
    const response = await fetch(api_url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    // console.log("Got response from Marvin");
    // console.log(data);
    // instantiate a new ChatQuestionAnswerUnitProps
    const newChatQuestionAnswerUnit: ChatQuestionAnswerUnitType = {
      id: data["id"],
      question: data["question"],
      error_message: data["error_message"],
      isDataLoading: false,
      answer_text: data["answer_text"],
      answer_table: data["answer_table"],
      answer_sql: data["answer_sql"],
      sql_generation_status: data["sql_generation_status"],
      answer_time_taken: data["answer_time_taken"],
      answer_total_cost: data["answer_total_cost"],
      answer_total_tokens: data["answer_total_tokens"],
      answer_confidence_score: data["answer_confidence_score"],
      is_odd: chatQuestionAnswerUnits.length % 2 === 0,
      question_ask_date: data["question_ask_date"],
      like_rating: false,
      not_like_rating: false,
      setHasUpdate: setHasUpdate,
    };
    // console.log(newChatQuestionAnswerUnit);
    setHasUpdate(true);

    setChatQuestionAnswerUnits([...chatQuestionAnswerUnits, newChatQuestionAnswerUnit]);

    const status: string = data["status"];
    const errorMsg: string = data["error_message"];
    setDataLoading(false);
    // clear the input field if no error

    inputQuestionRef.current!.value = "";
    setTextLength(0);
    setPromptHasText("");
    if (status !== "success" && status !== "ok") {
      setHasError(true);
      setErrorMessage(errorMsg);
    }
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    // console.log(`Enter key pressed with text: ${text}`);
    if (event.key === "Enter") {
      // stop the event from bubbling up
      event.preventDefault();
      const questionText = inputQuestionRef.current!.value;

      if (questionText.length > 0) {
        askQuestionToMarvin(questionText);
      }
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const text = event.target.value;
    setTextLength(text.length);
    if (event.target.value.length > 0) {
      setPromptHasText("lightblue");
    } else {
      setPromptHasText("");
    }
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const questionText = inputQuestionRef.current!.value;
    if (questionText.length > 0) {
      askQuestionToMarvin(questionText);
    }
  }

  return (
    <div className="flex w-full">
      {sessionUserName && <div className="font-bold text-teal-600 mr-2">{sessionUserName}</div>}
      <div className="flex-none fixed bottom-0 left-0 md:left-64 right-0 p-2 flex-col bg-gray-200 border-t-2 border-r-2 border-grey-100">
        <TextField
          placeholder={"Ask me a question about Rockhampton. Try to be specific (including dates)."}
          fullWidth
          multiline
          minRows={2}
          maxRows={10}
          disabled={dataLoading}
          inputRef={inputQuestionRef}
          variant="outlined"
          onKeyDown={handleEnterKey}
          onChange={handleInputChange}
          color="primary"
          focused
          className="bg-white mr-8"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <div className="ml-1 mr-1">{`${textLength} /1000`}</div>
                <IconButton sx={{ padding: "7px", margin: 0, backgroundColor: promptHasText }} onClick={handleClick}>
                  <FontAwesomeIcon icon={faPaperPlane} fontSize={"medium"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}
