import { FC, useEffect, useState } from "react";
import { useGameContext } from "../../context/GameContext";
import GameRunning from "../GameRunning";
import * as S from "./styles";

type GameContextType = {
  waiting: boolean;
};

const GameCenter: FC<GameContextType> = ({ waiting }) => {
  const { gameData } = useGameContext();
  const [missingPlayers, setMissingPlayers] = useState<number | undefined>(0);

  const countMissing = () => {
    let missing = 0;
    if (gameData) {
      gameData.players.forEach((player) => {
        if (player.username === "") {
          missing++;
        }
      });
      const total = gameData.players.length;
      return total - missing;
    }
  };

  useEffect(() => {
    if (gameData) {
      const missing = countMissing();
      setMissingPlayers(missing);
    }
  }, [gameData]);

  return (
    <S.Container>
      {waiting ? (
        <>
          <S.NotificationContainer>
            <S.NotificationText>
              <h3>
                {missingPlayers}/{gameData?.numberOfPlayers} Jogadores Prontos
              </h3>
            </S.NotificationText>
          </S.NotificationContainer>
          <S.GameContainer>
            <S.GameLoading>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </S.GameLoading>
            <S.Loading>
              Esperando Jogadores<span>.</span>
              <span>.</span>
              <span>.</span>
            </S.Loading>
          </S.GameContainer>
        </>
      ) : (
        <>
          <GameRunning />
        </>
      )}
    </S.Container>
  );
};

export default GameCenter;
