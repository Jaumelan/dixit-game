import GameName from '../../assets/images/gameName.png';
import GameLogo from '../../assets/images/gameLogo.png';
import * as S from "./styles";

const LandingBox = () => {
  return (
    <S.Container>
      <S.MainBox>
        <S.BoxLeft>
          <img src={GameName} alt="game name" />
          <button id="signUp">Cadastre-se</button>
        </S.BoxLeft>

        <S.BoxRight>
          <img src={GameLogo} alt="game logo" />
        </S.BoxRight>
      </S.MainBox>
    </S.Container>
  );
};

export default LandingBox;
