import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Snackbar } from "@mui/material";
import { useState } from "react";

interface UserInputPromptProps {
  question: string;
  isCompleted?: boolean;
}

function UserInputPromptSent(props: UserInputPromptProps): JSX.Element {
  const { question, isCompleted } = props;
  const [sessionUserName, setSessionUserName] = useState<string | null>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <div className="flex items-center pb-2">
      {sessionUserName && (
        <div className="mr-2 font-bold text-teal-600">{sessionUserName}</div>
      )}
      <div className="flex-grow rounded-md">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-slate-900 dark:text-slate-200"
            value={question}
            disabled
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 transform focus:outline-none"
            onClick={() => {
              navigator.clipboard.writeText(question);
              setIsCopied(true);
            }}
          >
            <FontAwesomeIcon
              icon={faCopy}
              className="text-gray-400 hover:text-gray-500"
              onClick={() => {
                navigator.clipboard.writeText(question);
                setIsCopied(true);
              }}
            />
          </button>
        </div>
      </div>
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

export default UserInputPromptSent;
