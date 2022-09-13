import { useState, useEffect } from "react";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";
import { usePlayContext } from "../../context/PlayContext";
import Carrousel from "../Carrousel";
import * as S from "./styles";

const GameRunning = () => {
  const [higherMessage, setHigherMessage] = useState<string>("");
  const { gameData } = useGameContext();
  const { user } = UserAuth();
  const { turn } = usePlayContext();

  useEffect(() => {
    if (turn) {
      const myTurn = turn.find((turn) => turn.played === false);
      if (myTurn?.username === user?.username) {
        setHigherMessage("Sua vez de jogar! Escolha uma carta");
      } else {
        setHigherMessage("Aguarde a vez de jogar");
      }
    }
  }, [turn]);

  return (
    <>
      <S.NotificationContainer>
        <S.NotificationText>
          <h3>{higherMessage}</h3>
        </S.NotificationText>
      </S.NotificationContainer>
      <S.GameContainer>
        <div>
          <Carrousel />
        </div>
      </S.GameContainer>
    </>
  );
};

export default GameRunning;
