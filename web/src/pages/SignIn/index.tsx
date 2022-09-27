import { Navbar, SigninBody } from "../../components";
import * as S from "./styles";
import video from '../../assets/videos/background.mp4';


const SignIn = () => {

  return (

    <S.Container>
      <S.Video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </S.Video>
      <Navbar />
      <S.Body>
        <SigninBody />
      </S.Body>
    </S.Container>
  );
};

export default SignIn;


