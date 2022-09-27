import { useState, useEffect, FC } from "react";
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
import { useSnackbar } from "notistack";
//import { useSnackbar } from "notistack";

type Props = {
  close: () => void;
};

const EnterGameSession: FC<Props> = ({ close }) => {
  const [gameSessions, setGameSessions] = useState<string[]>([]);
  const { user } = UserAuth();
  const {
    handleGameDataSetter,
    handleSetError,
    handlePlayerSetter,
    handleSendData,
  } = useGameContext();
  const [selectedGameSession, setSelectedGameSession] = useState<string>("");
  const [error, setError] = useState(false);
  const [noRooms, setNoRooms] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  //const [isSuccess, setIsSuccess] = useState(false);
  //const { enqueueSnackbar } = useSnackbar();

  const getGameSessions = async () => {
    try {
      if (user) {
        const response = await fetch(
          `http://68.232.175.134:8080/game/availables/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": user?.accessToken,
            },
          }
        );
        const res = await response.json();
        //console.log(res);
        if (res.messages.length > 0) {
          if (res.messages[0] === "Invalid token") {
            enqueueSnackbar("Faça login, sessão expirada", {
              variant: "error",
            });
            navigate("/");
          }
        } else if (res.data.length === 0) {
          setIsLoading((prev) => !prev);
          setNoRooms("Nenhuma sessão disponível, para jogar crie uma sala");
        } else {
          setGameSessions(() => res.data);
          //setIsLoading((prev) => !prev);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGameSessions();
  }, []);

  useEffect(() => {
    if (error) {
      handleSetError(error);
    }
  }, [error]);

  useEffect(() => {
    if (gameSessions.length > 0) {
      setIsLoading(false);
    }
  }, [gameSessions]);

  const handleEnterGameSession = (gameSessionId: string) => {
    setSelectedGameSession(gameSessionId);
  };

  const handleJoinGameSession = async () => {
    try {
      const updateGameSession = {
        username: user?.username,
        email: user?.email,
      };
      const response = await fetch(
        `http://68.232.175.134:8080/update/${selectedGameSession}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateGameSession),
        }
      );
      const res = await response.json();
      if (res.messages.length > 0) {
        enqueueSnackbar(res.messages[0], {
          variant: "error",
        });
      } else {
        const playersArray = res.data.playersString.split(",");
        const players: PlayerType[] = [];
        playersArray.forEach((player: string) => {
          const playerArray = player.split(":");
          const data = {
            username: playerArray[0] === undefined ? "" : playerArray[0],
            email: playerArray[1] === undefined ? "" : playerArray[1],
          };
          players.push(data);
        });

        const game = {
          id: selectedGameSession,
          players: players,
          numberOfPlayers: res.data.numberOfPlayers,
          cards: res.data.cards,
          pointsToWin: res.data.pointsToWin,
          turns: res.data.turns,
          
        };
        handleGameDataSetter(game);
        handlePlayerSetter("NEW-PLAYER");
        handleSendData(true);
        navigate(`/game/${selectedGameSession}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedGameSession !== "") {
      handleJoinGameSession();
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
