import { useState, FormEvent, ChangeEvent } from "react";
import { UserAuth } from "../../context/AuthContext";
import FormInput from "../FormInput";
import Button, { BUTTON_TYPE_CLASSES } from "../Button";

import { SignInContainer, ButtonsContainer } from "./styles";

const defaultFormFields = {
  username: "",
  email: "",
  password: "",
};

const SignInForm = () => {
  const { emailSignInStart, googleSignIn } = UserAuth();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      emailSignInStart(username, email, password);
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Já está cadastrado?</h2>
      <span>Entre com seu email e senha</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nome de Usuário"
          type="text"
          required
          onChange={handleChange}
          name="username"
          value={username}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Entrar</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Entrar com Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
