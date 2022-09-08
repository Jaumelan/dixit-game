import { Navbar } from "../../components";
import { LandingBox } from "../../components";
import video from "../../assets/videos/Background.mp4";
import * as S from "./styles";
//import "./style.css"

const LandingPage = () => {
  return (
    <S.Container>
      <S.Video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </S.Video>
      <Navbar />
      <LandingBox />
    </S.Container>
  );
};

export default LandingPage;
