import Boyboat from "../../assets/images/72.jpg";
import Button from "../Button";
import Keys from "../../assets/images/73.jpg";
import Painting from "../../assets/images/74.jpg";
import { Link } from "react-router-dom";
import * as S from "./styles";


const LandingBox = () => {
  return (
    <S.Container>
      
      <S.BoxLeft>
        <S.Title>DIXIT</S.Title>
        <S.LinkT to="/signup">
          <Button>Cadastre-se</Button>
        </S.LinkT>
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
