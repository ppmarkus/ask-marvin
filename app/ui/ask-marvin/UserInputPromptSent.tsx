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
// import WriteToClipboard from "../common/WriteToClipboard";

interface UserInputPromptProps {
  question: string;
  isCompleted?: boolean;
}

function UserInputPromptSent(props: UserInputPromptProps): JSX.Element {
  const { question, isCompleted } = props;
  const [sessionUserName, setSessionUserName] = useState<string | null>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (session) {
  //     if (session.user) {
  //       const loggedinusername: string = session.user.name!;
  //       if (loggedinusername.indexOf(" ") > 0) {
  //         const username = session.user.name?.substring(0, session.user.name.indexOf(" "))!;
  //         setSessionUserName(username);
  //       } else {
  //         setSessionUserName(loggedinusername);
  //       }
  //     }
  //   }
  // }, [session]);

  return (
    <div className="flex items-center pb-2">
      {sessionUserName && <div className="font-bold text-teal-600 mr-2">{sessionUserName}</div>}
      <div className="flex-grow">
        <TextField
          fullWidth
          disabled={true}
          value={question}
          size="small"
          variant="outlined"
          style={{ backgroundColor: "#FFFFFF" }}
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
