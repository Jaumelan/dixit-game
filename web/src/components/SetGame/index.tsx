import { FC, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../Button";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PLAYERTYPE } from "../../@types/dixit";
import { useSnackbar } from "notistack";
import * as S from "./styles";

type SetGameProps = {
  close: () => void;
  gameID: string;
};

const SetGame: FC<SetGameProps> = ({ close, gameID }) => {
  const { user } = UserAuth();
  const { handleGameSetter, handlePlayerSetter } = useGameContext();
  const [game, setGame] = useState({
    id: gameID,
    numberOfPlayers: 3,
    timePerTurn: 10,
  });
  //const websocket = useRef<WebSocket | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "numberOfPlayers") {
      if (Number(value) < 3 || Number(value) > 5) {
        alert("Players must be between 3 and 5");
        setGame({ ...game, numberOfPlayers: 3 });
        return;
      }
      setGame({ ...game, [name]: Number(value) });
    }
    if (name === "timePerTurn") {
      if (Number(value) < 10 || Number(value) > 30) {
        alert("Time per turn must be between 10s and 30s");
        setGame({ ...game, timePerTurn: 10 });
        return;
      }
      setGame({ ...game, [name]: Number(value) });
    }
  };

  /* useEffect(() => {
    if (game.id !== "") {
      console.log("game in context", game);
      handleGameSetter(game)
    }
  }, [game]); */

  const handleStartGame = async () => {
    const playersArray = [{ username: user?.username, email: user?.email }];
    for (let i = 0; i < game.numberOfPlayers; i++) {
      if (!playersArray[i]) {
        playersArray[i] = { username: "", email: "" };
      }
    }
    //console.log("playersArray", playersArray);
    const data = {
      ...game,
      players: playersArray,
      email: user?.email,
    };

    //console.log("data enviado ", data);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (user) {
        const response = await fetch(`http://localhost:8080/game/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user?.accessToken,
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        //console.log("res", res);
        if (res.messages.length > 0) {
          enqueueSnackbar(res.messages[0], { variant: "error" });
          return;
        }
        //console.log("res.data", res.data);
        handleGameSetter({ ...data, cards: res.data.cardsSrc } as any);
        handlePlayerSetter("CREATOR");
        navigate(`/game/${game.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <h2>CONFIGURE O JOGO</h2>
        <AiOutlineCloseCircle
          size={28}
          style={{ cursor: "pointer" }}
          onClick={close}
        />
      </S.TitleContainer>
      <S.GameRoom>
        <h3>ID da Sala: {game.id}</h3>
      </S.GameRoom>
      <S.SettersContainer>
        <S.IndividualSetter>
          <S.PlayerNumberContainer>
            <p>Número do Jogadores</p>
            <input
              type="number"
              name="numberOfPlayers"
              value={game.numberOfPlayers}
              onChange={handleGameChange}
            />
          </S.PlayerNumberContainer>
          <S.PlayerNumberContainer>
            <p>Pontos para a Vitória</p>
            <input type="number" placeholder="200" />
          </S.PlayerNumberContainer>
        </S.IndividualSetter>
        <S.IndividualSetter>
          <S.PlayerNumberContainer>
            <p>Tempo por turno (seg)</p>
            <input
              type="number"
              name="timePerTurn"
              value={game.timePerTurn}
              onChange={handleGameChange}
            />
          </S.PlayerNumberContainer>
          <S.PlayerNumberContainer>
            <p>Máximo de turnos </p>
            <input type="number" placeholder="15" />
          </S.PlayerNumberContainer>
        </S.IndividualSetter>
      </S.SettersContainer>

      <Button onClick={handleStartGame}>Iniciar Jogo</Button>
    </S.Container>
  );
};

export default SetGame;
