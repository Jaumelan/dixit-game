import { FC, useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../Button";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

type SetGameProps = {
  close: () => void;
};

const SetGame: FC<SetGameProps> = ({ close }) => {
  const { handleGameSetter } = useGameContext();
  const [game, setGame] = useState({ id: "", numberOfPlayers: 3, timePerTurn: 10 });
  const navigate = useNavigate();

  useEffect(() => {
    const gameId = Math.floor(Math.random() * 1001).toString();
    setGame({ ...game, id: gameId });
  }, []);

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

  const handleStartGame = () => {
    handleGameSetter(game);
    navigate(`/game/${game.id}`);
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
