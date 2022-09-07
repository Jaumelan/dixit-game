/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { SignupForm, LoginForm } from "../../components";
import * as S from "./styles";

const SigninBody = () => {
  const [register, setRegister] = useState(false);

  return (
    <>
      <S.Container>
        {register ? (
          <>
            <SignupForm />
            <S.Register onClick={() => setRegister(!register)}>
              <h3>Já tem cadastro?</h3>
            </S.Register>
          </>
        ) : (
          <>
            <LoginForm />
            <S.Register onClick={() => setRegister(!register)}>
              <h3>Não tem cadastro?</h3>
            </S.Register>
          </>
        )}
      </S.Container>
    </>
  );
};

export default SigninBody;
