import { useState } from "react";
import { usePlayContext } from "../../context/PlayContext";
import { Button } from "../../components";
import { AiFillStar } from "react-icons/ai";
import * as S from "./styles";

const ScoreComponent = () => {
  const [endGame, setEndGame] = useState(false);
  const {
    gameSetter,
    handleContinueSocket,
  } = usePlayContext();

  

  const scoresOrdered = gameSetter
    ?.sort((a, b) => b.score - a.score)
    .map((player) => ({
      score: player.score,
      email: player.email,
      name: player.username,
    }));

  const choosenImages = gameSetter?.map((player) => ({
    image: player.cardsPlayed[player.cardsPlayed.length - 1],
    email: player.email,
    name: player.username,
  }));

  /* const handleNextPlayer = () => {
    handleSetPlaying(true);
    handleSetDiscoverCard(false);
    handleEveryonePlayed(false);
    handlePlayersSelectCards(false);
  }; */

  const handleNextPlayer = () => {
    handleContinueSocket(true);
  };

  return (
    <S.Container>
      <S.PlayersImgHolder>
        {choosenImages &&
          choosenImages.map((player, index) => (
            <div key={`${index}-final`}>
              <h2>{player.name}</h2>
              <S.PlayerImg src={player.image} />
            </div>
          ))}
      </S.PlayersImgHolder>

      {gameSetter &&
        scoresOrdered?.map((game, index) =>
          index === 0 ? (
            <S.ScoreHolder key={`score-${index}`}>
              <S.StarName>
                <AiFillStar size={30} color="#FFD700" />
                <S.GamePlayer>{game.name}</S.GamePlayer>
              </S.StarName>

              <S.Score>{game.score}</S.Score>
            </S.ScoreHolder>
          ) : (
            <S.ScoreHolder key={`score-${index}`}>
              <S.GamePlayer>{game.name}</S.GamePlayer>
              <S.Score>{game.score}</S.Score>
            </S.ScoreHolder>
          )
        )}
      
        <Button onClick={handleNextPlayer}>Próximo</Button>
     
    </S.Container>
  );
};

export default ScoreComponent;
