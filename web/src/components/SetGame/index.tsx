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
  const [game, setGame] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const gameId = Math.floor(Math.random() * 1001).toString();
    setGame(gameId);
  }, []);

  useEffect(() => {
    if (game !== "") {
      handleGameSetter(game)
    }
  }, [game]);

  const handleStartGame = () => {
    navigate(`/game/${game}`);
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
        <h3>ID da Sala: {game}</h3>
      </S.GameRoom>
      <S.SettersContainer>
        <S.IndividualSetter>
          <S.PlayerNumberContainer>
            <p>Número do Jogadores</p>
            <input type="number" placeholder="1" />
          </S.PlayerNumberContainer>
          <S.PlayerNumberContainer>
            <p>Pontos para a Vitória</p>
            <input type="number" placeholder="200" />
          </S.PlayerNumberContainer>
        </S.IndividualSetter>
        <S.IndividualSetter>
          <S.PlayerNumberContainer>
            <p>Tempo por turno</p>
            <input type="number" placeholder="10" />
          </S.PlayerNumberContainer>
          <S.PlayerNumberContainer>
            <p>Máximo de turnos</p>
            <input type="number" placeholder="15" />
          </S.PlayerNumberContainer>
        </S.IndividualSetter>
      </S.SettersContainer>

      <Button onClick={handleStartGame}>Iniciar Jogo</Button>
    </S.Container>
  );
};

export default SetGame;
