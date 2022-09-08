import Boyboat from "../../assets/images/72.jpg";
import Keys from "../../assets/images/73.jpg";
import Painting from "../../assets/images/74.jpg";
import { Link } from "react-router-dom";
import * as S from "./styles";

const LandingBox = () => {
  return (
    <S.Container>
      {/* <S.MainBox> */}
      <S.BoxLeft>
        <S.Title>DIXIT</S.Title>
        <Link to="/signup">
          <button id="signUp">Cadastre-se</button>
        </Link>
      </S.BoxLeft>

      <S.BoxRight>
        <S.FirstImg src={Boyboat} />
        <S.SecondImg src={Keys} />
        <S.ThirdImg src={Painting} />
        {/* <img src={GameLogo} alt="game logo" /> */}
      </S.BoxRight>
      {/* </S.MainBox> */}
    </S.Container>
  );
};

export default LandingBox;
