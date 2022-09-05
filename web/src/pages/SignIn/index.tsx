import { Navbar } from "../../components";
import SigninBody from "../../components/SigninBody";
import * as S from "./styles";


const SignIn = () => {

  return (

    <S.Container>
      <Navbar />
      <S.Body>
        <SigninBody />
      </S.Body>
    </S.Container>
  );
};

export default SignIn;


