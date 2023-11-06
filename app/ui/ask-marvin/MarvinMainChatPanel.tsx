"use client";

import { LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { MarvinMainChatProps, ChatQuestionAnswerUnitType } from "@/app/lib/definitions";
import { chat_qestion_answer_data } from "@/app/lib/placeholder-data";

import UserInputPrompt from "@/app/ui/ask-marvin/UserInputPrompt";
// import { useSession } from "next-auth/react";
import ChatQuestionAnswerUnit from "./ChatQuestionAnswerUnit";

function MarvinMainChatPanel() {
  const [question, setQuestion] = useState<string>("");
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [logEntryToLoad, setLogEntryToLoad] = useState<string | null>(null);
  const [sessionUserName, setSessionUserName] = useState<string | null>("");
  const [sessionUserEmail, setSessionUserEmail] = useState<string | null>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  // const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // create a list of ChatQuestionAnswerUnits
  // each ChatQuestionAnswerUnit will have a question, a result, and a sql query
  // the sql query will be sent to the server to be executed
  // the result will be displayed in the ChatQuestionAnswerUnit
  // the question will be displayed in the ChatQuestionAnswerUnit
  // the ChatQuestionAnswerUnit will be added to the chat log

  const [chatQuestionAnswerUnits, setChatQuestionAnswerUnits] = useState<any[]>(chat_qestion_answer_data);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inputPrompt = document.getElementById("userInputPrompt");
    if (inputPrompt && scrollableDivRef.current) {
      const inputPromptHeight = inputPrompt.offsetHeight;
      scrollableDivRef.current.style.paddingBottom = `${inputPromptHeight}px`;
    }
  }, []);

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

  // // load Marvin chat log from the server
  // useEffect(() => {
  //   // get the chat log from the server
  //   if (sessionUserEmail) {
  //     fetch_chat_log_items_for_user();
  //   }
  // }, [sessionUserEmail]);

  useEffect(() => {
    if (logEntryToLoad) {
      fetch_chat_log_with_id(logEntryToLoad);
    }
  }, [logEntryToLoad]);

  async function fetch_chat_log_with_id(idToLoad: string) {
    setDataLoading(true);

    const entry = {
      user_email: sessionUserEmail,
      id: idToLoad,
    };
    // send async request to server to update the wiki entry
    const api_url: string = `${process.env.NEXT_PUBLIC_DARWIN_API_HOST}/api/v1/marvin/load-chat-item-with-id/`;
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

    const status: string = data["status"];
    const errorMsg: string = data["error_message"];
    setDataLoading(false);

    // clear the input field if no error
    if (status !== "success" && status !== "ok") {
      setErrorMessage(errorMsg);
    }
    const chatItem: ChatQuestionAnswerUnitType = data["chat_item"][0];

    setChatQuestionAnswerUnits([...chatQuestionAnswerUnits, chatItem]);

    // wait 1 second and then call setHasUpdate(true);
    setTimeout(() => {
      setHasUpdate(true);
    }, 500);
  }

  // when the question is updated add a new ChatQuestionAnswerUnit to the chat log
  useEffect(() => {
    if (question) {
      // console.log("got new chat question: " + question);
      // add a new ChatQuestionAnswerUnit to the chat log
      const newChatQuestionAnswerUnit: ChatQuestionAnswerUnitType = {
        id: String(chatQuestionAnswerUnits.length + 1),
        question: question,
        isDataLoading: true,
        like_rating: false,
        not_like_rating: false,
        setHasUpdate,
      };
      setChatQuestionAnswerUnits([...chatQuestionAnswerUnits, newChatQuestionAnswerUnit]);
      setHasUpdate(true);
    }
  }, [question]);

  async function fetch_chat_log_items_for_user() {
    setDataLoading(true);

    const entry = {
      user_email: sessionUserEmail,
    };
    // send async request to server to update the wiki entry
    const api_url: string = `${process.env.NEXT_PUBLIC_DARWIN_API_HOST}/api/v1/marvin/load-last-chat-items/`;
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

    const lastChatItems: ChatQuestionAnswerUnitType[] = data["chat_items"];

    // console.log(lastChatItems);

    setChatQuestionAnswerUnits(lastChatItems);

    const status: string = data["status"];
    const errorMsg: string = data["error_message"];
    setDataLoading(false);

    // clear the input field if no error
    if (status !== "success" && status !== "ok") {
      setErrorMessage(errorMsg);
    }
    // wait 1 second and then call setHasUpdate(true);
    setTimeout(() => {
      setHasUpdate(true);
    }, 500);
  }

  return (
    <div id="marvinchatwindow" className="w-full h-full flex flex-col justify-between">
      <div className="overflow-auto pb-64">
        {dataLoading ? (
          <div className="ml-10">
            <div className="h-2 w-20 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-2 w-20 bg-gray-300 rounded-full animate-pulse mt-2"></div>
            <div className="h-2 w-20 bg-gray-300 rounded-full animate-pulse mt-2"></div>
          </div>
        ) : (
          chatQuestionAnswerUnits.map((chat_qa, index) => (
            <ChatQuestionAnswerUnit
              key={chat_qa.id}
              id={chat_qa.id}
              question={chat_qa.question}
              question_ask_date={chat_qa.question_ask_date}
              error_message={chat_qa.error_message}
              isDataLoading={chat_qa.isDataLoading}
              answer_text={chat_qa.answer_text}
              answer_table={chat_qa.answer_table}
              answer_sql={chat_qa.answer_sql}
              sql_generation_status={chat_qa.sql_generation_status}
              answer_time_taken={chat_qa.answer_time_taken}
              answer_total_cost={chat_qa.answer_total_cost}
              answer_total_tokens={chat_qa.answer_total_tokens}
              answer_confidence_score={chat_qa.answer_confidence_score}
              like_rating={chat_qa.like_rating}
              not_like_rating={chat_qa.not_like_rating}
              is_odd={index % 2 === 0}
              setHasUpdate={setHasUpdate}
            />
          ))
        )}
      </div>

      <UserInputPrompt
        chat_question={question}
        set_chat_question={setQuestion}
        chatQuestionAnswerUnits={chatQuestionAnswerUnits}
        setChatQuestionAnswerUnits={setChatQuestionAnswerUnits}
        setHasUpdate={setHasUpdate}
        setHasError={setHasError}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}

export default MarvinMainChatPanel;
