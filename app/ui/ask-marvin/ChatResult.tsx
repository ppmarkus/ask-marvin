"use client";

import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import ChatResultTable from "./ChatResultTable";
import SyntaxHighlighter from "react-syntax-highlighter";

import { ChatResultProps, DataUpdateStatus } from "@/app/lib/definitions";
import { Alert, Box, Button, IconButton, TextField } from "@mui/material";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";

export default function ChatResult(props: ChatResultProps) {
  const {
    id,
    question_ask_date,
    isDataLoading,
    answer_text,
    answer_sql,
    sql_generation_status,
    answer_table,
    error_message,
    is_odd,
    answer_time_taken,
    answer_total_cost,
    answer_total_tokens,
    answer_confidence_score,
    like_rating,
    not_like_rating,
    setHasUpdate,
  } = props;

  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSqlQuery, setEditedSqlQuery] = useState(answer_sql);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [liked, setLiked] = useState<boolean>(like_rating);
  const [notLiked, setNotLiked] = useState<boolean>(not_like_rating);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // console.log("like_rating: " + like_rating);
      // console.log("not_like_rating: " + not_like_rating);
      // console.log("id: " + id);
      // when liked or notLiked changes, send the rating to the backend
      updateLikedNotLikedForQuestion(id, liked, notLiked);
      setHasUpdate(true);
    }
  }, [liked, notLiked]);

  async function updateLikedNotLikedForQuestion(id: string, liked: boolean, notliked: boolean) {
    setErrorMsg("");
    const data = {
      id: id,
      liked: liked,
      notliked: notliked,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
    // API endpoint where we send form data.
    const endpoint = `${process.env.NEXT_PUBLIC_DARWIN_API_HOST}/api/v1/marvin/set-liked-notliked-response/`;

    // Form the request for sending data to the server.
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result: DataUpdateStatus = await response.json();
    if (result.status != "ok") {
      setErrorMsg(result.error_message);
    }
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSqlQuery(answer_sql);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // TODO: Save the edited SQL query
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSqlQuery(event.target.value);
  };

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCopyClick = () => {
    if (!answer_sql) return;
    navigator.clipboard.writeText(answer_sql);
  };

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
    } else if (notLiked) {
      setNotLiked(false);
      setLiked(true);
    } else {
      setLiked(true);
    }
  };

  const handleNotLikeClick = () => {
    if (notLiked) {
      setNotLiked(false);
    } else if (liked) {
      setLiked(false);
      setNotLiked(true);
    } else {
      setNotLiked(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {answer_text && (
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <div className="font-bold min-w-10em w-10em">Answer:</div>
            <div className="flex-grow">{answer_text}</div>
          </div>
          <div className="flex flex-row items-center">
            <div className="font-bold min-w-10em w-10em">Confidence:</div>
            <div>{answer_confidence_score?.toLocaleString(undefined, { style: "percent" })}</div>
          </div>
        </div>
      )}
      <div className="flex flex-row items-center">
        {answer_time_taken && <div className="font-bold min-w-150px w-10em">Time taken:</div>}
        <div>{answer_time_taken}s</div>
      </div>
      <div className="flex flex-row items-center">
        {question_ask_date && <div className="font-bold min-w-10em w-10em">Question Asked:</div>}
        <div>{question_ask_date?.replace("T", " ")}</div>
      </div>
      <div className="flex flex-row items-center">
        {sql_generation_status && <div className="font-bold min-w-10em w-10em">Valid SQL?</div>}
        <div>{sql_generation_status}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="font-bold min-w-150px w-10em">評価/Rating:</div>
        <div>
          <IconButton size="small" onClick={() => handleLikeClick()}>
            <FontAwesomeIcon style={{ color: liked ? "green" : "" }} size="sm" icon={faThumbsUp} />
          </IconButton>
          <IconButton style={{ marginLeft: "0.5em" }} size="small" onClick={() => handleNotLikeClick()}>
            <FontAwesomeIcon style={{ color: notLiked ? "red" : "" }} className="marvinratingicon" size="sm" icon={faThumbsDown} />
          </IconButton>
        </div>
      </div>
      {answer_sql && (
        <div>
          <div className="flex flex-row items-center">
            <div className="flex-grow"></div>
            <Button size="small" className="mt-4 py-0" onClick={handleCollapseClick}>
              {isCollapsed ? "Show SQL" : "Hide SQL"}
            </Button>
          </div>
          {!isCollapsed && (
            <>
              <div className="w-full">
                {isEditing ? (
                  <div className="flex items-center">
                    <TextField multiline maxRows={10} label="SQL Query" variant="outlined" size="small" value={editedSqlQuery} onChange={handleInputChange} className="flex-grow" />
                    <Button onClick={handleCancelClick} className="ml-1">
                      Cancel
                    </Button>
                    <Button color="error" onClick={handleSaveClick} className="ml-1">
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center border-t border-gray-300 pt-2">
                    <Box sx={{ flexGrow: 1 }}>
                      <SyntaxHighlighter
                        customStyle={{
                          marginTop: 0,
                          backgroundColor: is_odd ? "#CCCCCC" : "#EEEEEE",
                        }}
                        useInlineStyles={true}
                        wrapLongLines={true}
                        wrapLines={true}
                        language="sql"
                        style={atomOneDark}
                      >
                        {answer_sql}
                      </SyntaxHighlighter>
                    </Box>
                    <IconButton className="ml-10 mb-10 p-0" onClick={handleCopyClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16 5h-1V3a2 2 0 00-2-2H7a2 2 0 00-2 2v2H4a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2zM7 3h6v2H7a1 1 0 01-1-1zm9 15a1 1 0 01-1 1H5a1 1 0 01-1-1V7h12v11z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </IconButton>
                    <Button size="small" onClick={handleEditClick} className="ml-1">
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      {error_message && <Alert severity="error">{error_message}</Alert>}
    </div>
  );
}
