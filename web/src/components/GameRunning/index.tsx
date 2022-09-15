import { useState, useEffect, FC } from "react";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";
import { usePlayContext } from "../../context/PlayContext";
import Carrousel from "../Carrousel";
import * as S from "./styles";

type Props = {
  missing: number | undefined;
};

const GameRunning: FC<Props> = ({ missing }) => {
  const [higherMessage, setHigherMessage] = useState<string>("");
  const { gameData } = useGameContext();
  const { user } = UserAuth();
  const { turn, handleSetTurn, handleSetCards } = usePlayContext();
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
      getInitialCards();
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
    const playedCards = [];
    if (gameData) {
      for (let i = 0; i < gameData?.players.length; i++) {
        const cards: { username: string; hand: string[] } = {
          username: "",
          hand: [],
        };

        cards.username = gameData?.players[i].username;

        if (gameData?.numberOfPlayers) {
          for (
            let j = (6 + Number(gameData?.numberOfPlayers)) * i;
            j < (6 + Number(gameData?.numberOfPlayers)) * (i + 1);
            j++
          ) {
            cards.hand.push(gameData?.cards[j]);
          }
          playedCards.push(cards);
        }
        handleSetCards(playedCards);
      }
    }
  };

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
