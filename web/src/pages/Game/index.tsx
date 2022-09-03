import { Navbar, GameBody } from "../../components";
import * as S from "./styles";

const Game = () => {
  return (
    <S.Container>
      <Navbar />
      <GameBody />
    </S.Container>
  );
};

export default Game;
