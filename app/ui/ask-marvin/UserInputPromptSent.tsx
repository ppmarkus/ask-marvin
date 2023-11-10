import Box from "@mui/material/Box";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { InputAdornment, Snackbar } from "@mui/material";

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
        <TextField
          fullWidth
          disabled={true}
          value={question}
          size="small"
          variant="outlined"
          style={{ backgroundColor: "#FFFFFF", borderRadius: "0.25rem" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy Question">
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => {
                      navigator.clipboard.writeText(question);
                      setIsCopied(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
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
