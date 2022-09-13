import { useState, useEffect, FC, useRef } from "react";
import Loading from "../Loading";
import * as S from "./styles";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { BUTTON_TYPE_CLASSES } from "../Button";
import { IoCloseSharp } from "react-icons/io5";
import { ImEnter } from "react-icons/im";
import { PlayerType } from "../../@types/dixit";
import { useGameContext } from "../../context/GameContext";
//import { useSnackbar } from "notistack";

type Props = {
  close: () => void;
};

const EnterGameSession: FC<Props> = ({ close }) => {
  const [gameSessions, setGameSessions] = useState<string[]>([]);
  const { user } = UserAuth();
  const { handleGameSetter } = useGameContext();
  const [selectedGameSession, setSelectedGameSession] = useState<string>("");
  //const [error, setError] = useState("");
  const [noRooms, setNoRooms] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //const [isSuccess, setIsSuccess] = useState(false);
  const websocket = useRef<WebSocket | null>(null);
  //const { enqueueSnackbar } = useSnackbar();

  const getGameSessions = async () => {
    try {
      const response = await fetch("http://localhost:8080/game/availables");
      const res = await response.json();
      //console.log(res);
      if (res.data.length === 0) {
        setIsLoading((prev) => !prev);
        setNoRooms("Nenhuma sessão disponível, para jogar crie uma sala");
      } else {
        setGameSessions(() => res.data);
        //setIsLoading((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGameSessions();
    websocket.current = new WebSocket(`ws://localhost:8081`);
    websocket.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    websocket.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
    /* return () => {
      websocket.current?.close();
    }; */
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
        `ws://localhost:8081/${selectedGameSession}`
      );
      websocket.current.onopen = () => {
        const data = {
          action: "new-player",
          payload: {
            username: user?.username,
            id: selectedGameSession,
            email: user?.email,
          },
        };
        console.log("entering game session");
        websocket.current?.send(JSON.stringify(data));
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      websocket.current.onmessage = (event: any) => {
        const answ = event.data;
        //console.log("do websoquete ", answ);
        if (answ instanceof Blob) {
          const reader = new FileReader();
          reader.readAsText(answ);
          reader.onload = () => {
            const received = JSON.parse(reader.result as string);
            console.log("from websocket ", received);
          };
        } else {
          const ans = JSON.parse(answ);
          console.log("from websocket ", ans);
          const players: PlayerType[] = [];
          ans.data.playersString.split(",").forEach((player: string) => {
            if (player !== ":") {
              const p = player.split(":");
              players.push({ username: p[0], email: p[1] });
            } else {
              players.push({ username: "", email: "" });
            }
          });
          console.log("players ", players);
          const dataContext = {
            id: ans.data.id,
            players: players,
            numberOfPlayers: ans.data.numberOfPlayers,
            timePerTurn: ans.data.timePerTurn,
          };
          handleGameSetter(dataContext);
        }
      };
      navigate(`/game/${selectedGameSession}`);
    }
  }, [selectedGameSession]);

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
          {noRooms ? (
            <S.NoRooms>
              <h2>{noRooms}</h2>
            </S.NoRooms>
          ) : (
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
          )}
        </S.Container>
      )}
    </div>
  );
};

export default EnterGameSession;
