import GameName from '../../assets/images/gameName.png';
import GameLogo from '../../assets/images/gameLogo.png';
import { Link } from "react-router-dom";
import * as S from "./styles";

const LandingBox = () => {
  return (
    <S.Container>
      <S.MainBox>
        <S.BoxLeft>
          <img src={GameName} alt="game name" />
          <Link to="/signup">
            <button id="signUp">Cadastre-se</button>
          </Link>

        </S.BoxLeft>

        <S.BoxRight>
          <img src={GameLogo} alt="game logo" />
        </S.BoxRight>
      </S.MainBox>
    </S.Container>
  );
};

export default LandingBox;
