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
  const { turn, handleSetTurn } = usePlayContext();
  const [turnCount, setTurnCount] = useState<number>(0);

  useEffect(() => {
    if (turn) {
      const myTurn = turn.find((turn) => turn.played === false);
      if (myTurn?.username === user?.username) {
        setHigherMessage("Sua vez de jogar! Escolha uma carta");
      } else {
        setHigherMessage("Aguarde a vez de jogar");
      }
      setTurnCount((prev) => prev + 1);
    }
  }, [turn]);

  useEffect(() => {
    if (turnCount === gameData?.players.length) {
      setHigherMessage("Acabou a rodada! Quer jogar novamente?");
    }
  }, [turnCount]);

  const handlePlayAgain = () => {
    setTurnCount(0);
    const newTurn = turn?.map((item) => ({
      ...item,
      played: false,
      card: "",
      message: "",
    }));
    if (newTurn) {
      handleSetTurn(newTurn);
    }
  };

  const getInitialCards = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=6")
      .then((response) => response.json())
      .then((data) => {
        const cards = data.cards.map((card: { image: any }) => card.image);
        console.log(cards);
      });
  };

  

  return (
    <>
      <S.NotificationContainer>
        <S.NotificationText>
          <h3>{higherMessage}</h3>
        </S.NotificationText>
      </S.NotificationContainer>
      <S.GameContainer>
        <button onClick={getInitialCards}>Get cards</button>
        <div>
          <Carrousel />
        </div>
      </S.GameContainer>
    </>
  );
};

export default GameRunning;
