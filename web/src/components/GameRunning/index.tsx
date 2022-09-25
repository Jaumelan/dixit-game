import { useState, useEffect, FC } from "react";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";
import {
  DiscoverDixit,
  DixitTurn,
  NonDixitCarrousel,
  ScoreComponent,
  Podium,
} from "../../components";
import { usePlayContext } from "../../context/PlayContext";
import { useSnackbar } from "notistack";
import * as S from "./styles";

const GameRunning = () => {
  const [higherMessage, setHigherMessage] = useState<string>("");
  const { handleSetTurns, checkTurns, turns } = useGameContext();
  const { user } = UserAuth();
  const {
    gameSetter,
    playersName,
    handleSetGame,
    playing,
    handleSetPlaying,
    playersSelectCards,
    discoverCard,
    everyonePlayed,
    handleSetPlayersName,
    nextRound,
  } = usePlayContext();
  const [myTurn, setMyTurn] = useState(false);

  const [turnCount, setTurnCount] = useState<number>(0);
  const [notification, setNotification] = useState<string>("");

  const [endGame, setEndGame] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (gameSetter) {
      if (playing) {
        if (!endGame) {
          const myTurn = gameSetter.find((turn) => turn.played === false);

          if (!myTurn) {
            handleSetTurns(1);
          } else if (myTurn.email === user?.email) {
            setHigherMessage("Sua vez de jogar! Escolha uma carta");
            setMyTurn(() => true);
            handleSetPlaying(false);
            handleSetPlayersName(myTurn.email);
          } else {
            setHigherMessage("Aguarde sua vez de jogar");
            setMyTurn(() => false);
            handleSetPlaying(false);
          }
          setTurnCount((prev) => prev + 1);
          //getInitialCards();
        }
      }
    }
  }, [gameSetter, playing]);

  useEffect(() => {
    if (playersSelectCards) {
      if (gameSetter) {
        const messageDixit: string[] = [];
        gameSetter.forEach((gameSet) => {
          if (gameSet.played === true) {
            messageDixit.push(...gameSet.messages);
          }
        });
        if (myTurn) {
          //const lastPlayerTurn = turn.find()
          setNotification("Aguarde os outros jogadores escolherem uma carta");
        } else {
          setNotification(
            "Escolha uma carta que pode se encaixar na descrição acima"
          );
        }
        //console.log("messageDixit", messageDixit);
        //console.log(messageDixit.length);
        setHigherMessage(messageDixit[messageDixit.length - 1]);
      }
    }
  }, [playersSelectCards]);

  useEffect(() => {
    if (gameSetter) {
      const countTurnsCompleted = gameSetter.reduce((acc, curr) => {
        if (curr.played) {
          return acc + 1;
        }
        return acc;
      }, 0);
      if (countTurnsCompleted === gameSetter.length) {
        nextRound();
        /* setHigherMessage("Acabou a rodada! Quer jogar novamente?");
        setMyTurn(() => false); */
      }
    }
  }, [turnCount]);

  useEffect(() => {
    if (checkTurns === true) {
      console.log("turns jogados", turns);
      if (turns === 2) {
        setEndGame(true);
        setHigherMessage("O jogo acabou!");
      }
      /* handleSetPlaying(true);
      handleSetDiscoverCard(false);
      handleEveryonePlayed(false);
      handleContinueSocket(true); */
    }
  }, [checkTurns, turns]);

  const handlePlayAgain = () => {
    setTurnCount(0);
    //requisitar novas cartas
    const newTurn = gameSetter?.map((item) => ({
      ...item,
      played: false,
      cardsPlayed: [],
      messages: [],
      hand: [],
    }));
    if (newTurn) {
      handleSetGame(newTurn);
    }
  };

  useEffect(() => {
    console.log("players name ", playersName);
  }, [playersName]);

  return (
    <>
      <S.NotificationContainer>
        <S.NotificationText>
          <h3>{higherMessage}</h3>
        </S.NotificationText>
      </S.NotificationContainer>
      <S.GameContainer>
        {endGame ? (
          <Podium />
        ) : everyonePlayed ? (
          <ScoreComponent />
        ) : discoverCard ? (
          <DiscoverDixit turn={myTurn} />
        ) : !myTurn ? (
          <NonDixitCarrousel />
        ) : myTurn ? (
          <DixitTurn />
        ) : (
          <></>
        )}
      </S.GameContainer>
    </>
  );
};

export default GameRunning;
