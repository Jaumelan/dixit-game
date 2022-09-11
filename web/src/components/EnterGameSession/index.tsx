import { useState, useEffect, FC, useRef } from "react";
import Loading from "../Loading";
import * as S from "./styles";
import Button from "../Button";
import { UserAuth } from "../../context/AuthContext";
import { BUTTON_TYPE_CLASSES } from "../Button";
import { IoCloseSharp } from "react-icons/io5";
import { ImEnter } from "react-icons/im";
//import { useSnackbar } from "notistack";

type Props = {
  close: () => void;
};

const EnterGameSession: FC<Props> = ({ close }) => {
  const [gameSessions, setGameSessions] = useState<string[]>([]);
  const { user } = UserAuth();
  const [selectedGameSession, setSelectedGameSession] = useState<string>("");
  const [error, setError] = useState("");
  const [send, setSend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //const [isSuccess, setIsSuccess] = useState(false);
  const websocket = useRef<WebSocket | null>(null);
  //const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getGameSessions = async () => {
      try {
        const response = await fetch("http://localhost:8080/game/availables");
        const res = await response.json();
        //console.log(res);
        if (res.data.length === 0) {
          setError("Nenhuma sessão disponível, para jogar crie uma sala");
        } else {
          setGameSessions(() => res.data);
          //setIsLoading((prev) => !prev);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGameSessions();
  }, []);

  useEffect(() => {
    if (gameSessions.length > 0) {
      setIsLoading(false);
    }
  }, [gameSessions]);

  /*const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/game-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameSessionId }),
    });
    const data = await response.json();
    if (response.ok) {
      setIsSuccess(true);
      enqueueSnackbar("Game session created!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };
  */

  const handleEnterGameSession = (gameSessionId: string) => {
    setSelectedGameSession(gameSessionId);
    
  };


  useEffect(() => {
    if (selectedGameSession !== "") {
    websocket.current = new WebSocket(
      `ws://localhost:8080/${selectedGameSession}`
    );
    websocket.current.onopen = () => {
      console.log("connected");
    };
    websocket.current.onmessage = (e) => {
      if (e.data instanceof Blob) {
        const reader = new FileReader();
        reader.readAsText(e.data);
        reader.onload = () => {
          console.log("reader", reader.result);
        };
      }
    };
    websocket.current.onclose = () => {
      console.log("disconnected");
    };
    setSend(true);
  }
    return () => {
      websocket.current?.close();
    };
  }, [selectedGameSession]);

  useEffect(() => {
    if (send) {
      console.log("send");
      websocket.current?.send(
        JSON.stringify({ email: user?.email, username: user?.username })
      );
    }
  }, [send]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <S.Container>
          <S.TitleContainer>
            <S.Title>Selecione uma sessão</S.Title>
            <S.ExitButton>
              <IoCloseSharp
                size={30}
                color="#B28AEB"
                onClick={close}
                style={{ cursor: "pointer" }}
              />
            </S.ExitButton>
          </S.TitleContainer>

          <S.SessionContainer>
            {gameSessions.map((gameSession) => (
              <S.SessionEnter key={gameSession}>
                <h3>Sala {gameSession}</h3>
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.LoginSession}
                  onClick={() => handleEnterGameSession(gameSession)}
                >
                  <ImEnter size={20} />
                </Button>
              </S.SessionEnter>
            ))}
          </S.SessionContainer>
        </S.Container>
      )}
    </div>
  );
};

export default EnterGameSession;
