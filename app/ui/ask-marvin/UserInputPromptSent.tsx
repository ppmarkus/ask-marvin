// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// import { useSession } from "next-auth/react";
import { useState } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Snackbar } from "@mui/material";

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
      {sessionUserName && <div className="font-bold text-teal-600 mr-2">{sessionUserName}</div>}
      <div className="flex-grow rounded-md">
        <div className="w-full relative">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-3 bg-white text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            value={question}
            disabled
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
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
