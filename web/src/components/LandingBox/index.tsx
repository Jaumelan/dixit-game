import Boyboat from "../../assets/images/72.jpg";
import Keys from "../../assets/images/73.jpg";
import Painting from "../../assets/images/74.jpg";
import { Link } from "react-router-dom";
import * as S from "./styles";
import video from "../../assets/videos/Background.mp4";

const LandingBox = () => {
  return (
    <S.Container>
      <S.Video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </S.Video>
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
       
      </S.BoxRight>
      
    </S.Container>
  );
};

export default LandingBox;
