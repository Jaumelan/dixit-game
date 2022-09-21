import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useGameContext } from "../../context/GameContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import * as S from "./styles";

const ChatAccordion = () => {
  const [message, setMessage] = useState("");
  const { handleSetMyMessage, chatMessages } = useGameContext();
  const { user } = UserAuth();

  const handleSetMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message !== "") {
      const data = {
        username: user?.username as string,
        message: message,
      };
      handleSetMyMessage(data);
      setMessage("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const listMessages = chatMessages.map((message, index) => {
    return (
      <div key={index}>
        <S.UserMessage>{message.username}: </S.UserMessage>
        <S.Message>{message.message}</S.Message>
      </div>
    );
  });

  return (
    <Accordion sx={{ bgcolor: "rgba(134, 138, 154, 0.2)" }}>
      <AccordionSummary
        expandIcon={<MdExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          sx={{
            width: "33%",
            flexShrink: 0,
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            scrollBehavior: "smooth",
          }}
        >
          Chat
        </Typography>
        {/* <Typography sx={{ color: "text.secondary" }}>Chat</Typography> */}
      </AccordionSummary>
      <AccordionDetails>
        <S.ChatMessages>{listMessages}</S.ChatMessages>
        <div>
          <input type="text" value={message} onChange={handleSetMessage} onKeyDown={handleKeyPress} />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ChatAccordion;
