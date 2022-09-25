import { usePlayContext } from "../../context/PlayContext";

import { AiFillStar } from "react-icons/ai";
import * as S from "./styles";

const Podium = () => {
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
      <h1>Podium</h1>

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
          ) : index === 1 ? (
            <S.ScoreHolder key={`score-${index}`}>
                <S.StarName>
                    <AiFillStar size={30} color="#C0C0C0" />
                    <S.GamePlayer>{game.name}</S.GamePlayer>
                </S.StarName>
              <S.Score>{game.score}</S.Score>
            </S.ScoreHolder>
          ) : (
            <S.ScoreHolder key={`score-${index}`}>
                <S.StarName>
                    <AiFillStar size={30} color="#CD7F32" />
                    <S.GamePlayer>{game.name}</S.GamePlayer>
                </S.StarName>
              <S.Score>{game.score}</S.Score>
            </S.ScoreHolder>
          )
        )}

      <h2>Para voltar a jogar crie outro sala</h2>
    </S.Container>
  );
};

export default Podium;
