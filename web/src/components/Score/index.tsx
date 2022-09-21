import { usePlayContext } from "../../context/PlayContext";

const ScoreComponent = () => {
  const { gameSetter } = usePlayContext();

  return (
    <div>
      {gameSetter &&
        gameSetter.map((game, index) => (
          <div key={`score-${index}`}>
            <h1>{game.email}</h1>
            <h2>{game.score}</h2>
          </div>
        ))}
    </div>
  );
};

export default ScoreComponent;
