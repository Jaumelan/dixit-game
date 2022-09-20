import { useState, useEffect, FC } from "react";
import { useGameContext } from "../../context/GameContext";
import { TurnType } from "../../@types/dixit";
import { UserAuth } from "../../context/AuthContext";
import { Button, DiscoverCard, DixitTurn, NonDixitCarrousel } from "../../components";
import { usePlayContext } from "../../context/PlayContext";
import { useSnackbar } from "notistack";
import Carrousel from "../Carrousel";
import * as S from "./styles";

type Props = {
  missing: number | undefined;
};

const GameRunning: FC /* <Props> */ = (/* { missing } */) => {
  const [higherMessage, setHigherMessage] = useState<string>("");
  const { gameData } = useGameContext();
  const { user } = UserAuth();
  const {
    gameSetter,
    handleSetGame,
    handleUpdateDiscover,
    handleUpdateGameSetter,
    UpdateOtherPlayersGameSetter,
    playing,
    handleSetPlaying,
    playersSelectCards,
    discoverCard,
  } = usePlayContext();
  const [myTurn, setMyTurn] = useState(false);
  const [cardSelected, setCardSelected] = useState("");
  const [otherPlayersCard, setOtherPlayersCard] = useState("");
  const [turnCount, setTurnCount] = useState<number>(0);
  const [notification, setNotification] = useState<string>("");
  const [dixitMessage, setDixitMessage] = useState<string>("");
  const [endGame, setEndGame] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (gameSetter) {
      if (playing) {
        if (!endGame) {
          const myTurn = gameSetter.find((turn) => turn.played === false);

          if (!myTurn) {
            enqueueSnackbar("Everyone has already played!", {
              variant: "info",
            });
          } else if (myTurn.email === user?.email) {
            setHigherMessage("Sua vez de jogar! Escolha uma carta");
            setMyTurn(() => true);
            handleSetPlaying(false);
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
        setHigherMessage("Acabou a rodada! Quer jogar novamente?");
        setMyTurn(() => false);
      }
    }
  }, [turnCount]);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectPlayersCards = (e: any) => {
    setOtherPlayersCard(e.target.src);
  };

  const submitOtherPlayersCard = () => {
    if (user) {
      const data = {
        email: user?.email,
        cardsPlayed: otherPlayersCard,
      };
      UpdateOtherPlayersGameSetter(data);
    }
  };

  const handleDiscoverCard = (data: string) => {
    const discoverCardData = {
      email: user?.email as string,
      choosenCard: data,
    };
    handleUpdateDiscover(discoverCardData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getPlayersTurnSelectedImg = (e: any) => {
    const card = e.target.src;
    setCardSelected(card);
  };

  const handleDixitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDixitMessage(e.target.value);
  };

  /*const getInitialCards = () => {
    //const playedCards = [];
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

    
    if (gameSetter) {
      if (gameData) {
        const newGameSet: TurnType[] = [];

        gameSetter.forEach((gameSet, index) => {
          const hand: string[] = [];

          for (
            let j = (6 + Number(gameData.numberOfPlayers)) * index;
            j < (6 + Number(gameData.numberOfPlayers)) * (index + 1);
            j++
          ) {
            hand.push(gameData.cards[j]);
          }
          //console.log("hand", hand);
          newGameSet.push({ ...gameSet, hand: hand });
          //console.log("newGameSet", newGameSet);
        });

        //console.log("newGameSet 2", newGameSet);

        handleSetGame(newGameSet);
      }
    }
  };
  */

  const handleSubmitDixit = () => {
    if (user) {
      const data = {
        email: user?.email,
        cardsPlayed: cardSelected,
        message: dixitMessage,
        //played: true,
      };
      handleUpdateGameSetter(data);
    }
  };

  useEffect(() => {
    console.log(myTurn, "myTurn");
    console.log("playersSelectCards ", playersSelectCards);
  }, [myTurn, playersSelectCards]);

  return (
    <>
      <S.NotificationContainer>
        <S.NotificationText>
          <h3>{higherMessage}</h3>
        </S.NotificationText>
      </S.NotificationContainer>
      <S.GameContainer>
        {/* <h3>{notification}</h3> */}
        {discoverCard && !myTurn ? (
          <DiscoverCard getSelectedImg={handleDiscoverCard} />
        ) : !myTurn  ? (
          <NonDixitCarrousel />
        ) : myTurn ? (
          <DixitTurn />
        ) : (
          <Carrousel getSelectedImg={handleSelectPlayersCards} />
        )}
      </S.GameContainer>
    </>
  );
};

export default GameRunning;
