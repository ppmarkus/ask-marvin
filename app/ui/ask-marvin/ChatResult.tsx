"use client";

import { faCopy, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ChatResultTable from "./ChatResultTable";
import SyntaxHighlighter from "react-syntax-highlighter";

import { ChatResultProps, DataUpdateStatus } from "@/app/lib/definitions";
import { Alert, Box, Button, IconButton, Snackbar, TextField, Tooltip } from "@mui/material";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { sql } from "@vercel/postgres";

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
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [liked, setLiked] = useState<boolean>(like_rating);
  const [notLiked, setNotLiked] = useState<boolean>(not_like_rating);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      console.log("question_ask_date: " + question_ask_date);
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
    <div className="bg-white rounded-lg shadow-md p-4 mb-2">
      {answer_text && (
        <div className="flex flex-col pb-4">
          <div className="flex flex-row items-start text-gray-600">
            <div className="flex-grow">{answer_text}</div>
          </div>
        </div>
      )}
      {answer_table && answer_table.length > 5 ? (
        <div>
          <ChatResultTable tableData={JSON.parse(answer_table)} />
        </div>
      ) : null}
      <div className="flex text-gray-400 text-xs p-0 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 grow">
          {answer_total_tokens ? (
            <div className="flex">
              <div className="font-bold pr-2">Tokens:</div>
              <div>{answer_total_tokens?.toLocaleString()}</div>
            </div>
          ) : (
            <div className="flex"></div>
          )}

          {answer_time_taken ? (
            <div className="flex">
              <div className="font-bold pr-2">Time taken:</div>
              <div>{answer_time_taken}s</div>
            </div>
          ) : (
            <div className="flex"></div>
          )}
          {question_ask_date ? (
            <div className="flex">
              <div className="font-bold pr-2">Asked:</div>
              <div>{question_ask_date.replace("T", " ")}</div>
            </div>
          ) : (
            <div className="flex"></div>
          )}

          {sql_generation_status ? (
            <div className="flex">
              <div className="font-bold pr-2">Valid SQL?</div>
              <div>{sql_generation_status}</div>
            </div>
          ) : (
            <div className="flex"></div>
          )}
          {/* {answer_total_cost ? (
            <div className="flex">
              <div className="font-bold pr-2">Cost: $</div>
              <div>{answer_total_cost}</div>
            </div>
          ) : (
            <div className="flex"></div>
          )} */}
          {answer_confidence_score ? (
            <div className="flex">
              <div className="font-bold pr-2">Confidence:</div>
              <div>{answer_confidence_score?.toLocaleString(undefined, { style: "percent" })}</div>
            </div>
          ) : (
            <div className="flex"></div>
          )}

          <div className="flex">
            <div className="flex flex-row items-center">
              <div className="font-bold min-w-150px w-10em pr-2">評価/Rating:</div>
              <div>
                <IconButton size="small" onClick={() => handleLikeClick()}>
                  <FontAwesomeIcon style={{ color: liked ? "green" : "" }} size="sm" icon={faThumbsUp} />
                </IconButton>
                <IconButton style={{ marginLeft: "0.5em" }} size="small" onClick={() => handleNotLikeClick()}>
                  <FontAwesomeIcon style={{ color: notLiked ? "red" : "" }} className="marvinratingicon" size="sm" icon={faThumbsDown} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex sm:items-end">
          <div className="grow"></div>
          <Button size="small" className="py-0" onClick={handleCollapseClick}>
            {isCollapsed ? "Show SQL" : "Hide SQL"}
          </Button>
        </div>
      </div>

      <div className="font-bold hidden sm:block flex-shrink:0 ">
        {answer_sql && (
          <div>
            {!isCollapsed && (
              <div>
                <div className="min-w-min lg:w-full">
                  {isEditing ? (
                    <div className="flex items-center">
                      <TextField multiline maxRows={10} label="SQL Query" variant="outlined" size="small" value={editedSqlQuery} onChange={handleInputChange} className="grow" />
                      <Button onClick={handleCancelClick} className="ml-1 text-xs text-red-600">
                        Cancel
                      </Button>
                      {/* <Button color="error" onClick={handleSaveClick} className="ml-1">
                        Save
                      </Button> */}
                    </div>
                  ) : (
                    <div className="flex items-center border-t border-gray-300 pt-2">
                      <div className="grow w-80">
                        <SyntaxHighlighter
                          customStyle={{
                            marginTop: 0,
                            minWidth: 250,
                            backgroundColor: is_odd ? "#EEEEEE" : "#EEEEEE",
                          }}
                          useInlineStyles={true}
                          wrapLongLines={true}
                          wrapLines={true}
                          language="sql"
                          style={atomOneLight}
                        >
                          {answer_sql}
                        </SyntaxHighlighter>
                      </div>
                      <Tooltip title="Copy Question">
                        <FontAwesomeIcon
                          icon={faCopy}
                          color="gray"
                          onClick={() => {
                            navigator.clipboard.writeText(answer_sql);
                            setIsCopied(true);
                          }}
                          className="cursor-pointer ml-2"
                        />
                      </Tooltip>
                      <Button size="small" onClick={handleEditClick} className="ml-1 text-xs">
                        Raw Text
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {error_message && (
        <Alert className="mt-4" severity="error">
          {error_message}
        </Alert>
      )}
      <Snackbar
        open={isCopied}
        autoHideDuration={2000}
        onClose={() => setIsCopied(false)}
        message="Text copied!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </div>
  );
}
