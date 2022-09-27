import { useState, useEffect } from "react";
import { usePlayContext } from "../../context/PlayContext";
import { Button } from "../../components";
import { AiFillStar } from "react-icons/ai";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import * as S from "./styles";

const ScoreComponent = () => {
  const [endGame, setEndGame] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const {
    gameSetter,
    handleContinueSocket,
  } = usePlayContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  

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
        <Box sx={{ width: '100%' }}>
          <h3>Próximo Jogador</h3>
        <LinearProgress variant="determinate" value={progress} />
        </Box>
      
        
     
    </S.Container>
  );
};

export default ScoreComponent;
