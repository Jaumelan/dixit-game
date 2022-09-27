import { Navbar } from "../../components";
import SignupBody from "../../components/SignupBody";
import video from '../../assets/videos/background.mp4';
import * as S from "./styles";


const SignIn = () => {

  return (

    <S.Container>
      <S.Video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </S.Video>
      <Navbar />
      <S.Body>
        <SignupBody />
      </S.Body>
    </S.Container>
  );
};

export default SignIn;


