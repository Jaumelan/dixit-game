import { FC, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../Button";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

type SetGameProps = {
  close: () => void;
  gameID: string;
};

const SetGame: FC<SetGameProps> = ({ close, gameID }) => {
  const { user } = UserAuth();
  const { handleGameSetter } = useGameContext();
  const [game, setGame] = useState({
    id: gameID,
    numberOfPlayers: 3,
    timePerTurn: 10,
  });
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
    const data = { ...game, players: [user?.email] };

    try {
      handleGameSetter(data as any);
      /* const response = await fetch(`http://localhost:8080/game/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log("res", res); */

      navigate(`/game/${game.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <h2>Novo Jogo</h2>
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
