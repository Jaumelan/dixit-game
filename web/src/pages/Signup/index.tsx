import { Navbar } from "../../components";
import SignupBody from "../../components/SignupBody";
import * as S from "./styles";


const SignIn = () => {

  return (

    <S.Container>
      <Navbar />
      <S.Body>
        <SignupBody />
      </S.Body>
    </S.Container>
  );
};

export default SignIn;


