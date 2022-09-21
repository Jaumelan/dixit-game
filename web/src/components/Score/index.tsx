import { usePlayContext } from "../../context/PlayContext";
import { AiFillStar } from "react-icons/ai";
import * as S from "./styles";

const ScoreComponent = () => {
  const { gameSetter } = usePlayContext();

  const scoresOrdered = gameSetter
    ?.sort((a, b) => b.score - a.score)
    .map((player) => ({
      score: player.score,
      email: player.email,
      name: player.username,
    }));

  return (
    <S.Container>
      {gameSetter &&
        scoresOrdered?.map((game, index) =>
          index === 0 ? (
            <S.ScoreHolder key={`score-${index}`}>
              <div>
                <AiFillStar size={30} color="#FFD700" />
                <S.GamePlayer>{game.name}</S.GamePlayer>
              </div>

              <S.Score>{game.score}</S.Score>
            </S.ScoreHolder>
          ) : (
            <S.ScoreHolder key={`score-${index}`}>
              <S.GamePlayer>{game.name}</S.GamePlayer>
              <S.Score>{game.score}</S.Score>
            </S.ScoreHolder>
          )
        )}
    </S.Container>
  );
};

export default ScoreComponent;
