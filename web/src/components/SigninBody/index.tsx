/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEventHandler, useState } from "react";
import * as S from "./styles";
import { Button } from "../../components";
import { BUTTON_TYPE_CLASSES } from "../Button";
import GoogleLogin from "../../components/GoogleLogin";
import { Link } from "react-router-dom";

const SigninBody = () => {
  const [register, setRegister] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formValuesRegister, setFormValuesRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateRegisterInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let error = "";
    switch (name) {
      case "email":
        console.log(value);
        console.log('teste',emailRegex.test(value));
        error = emailRegex.test(value) ? "" : "Email não válido";
        break;
      case "password":
        error =
          value.length < 6 ? "A senha deve conter pelo menos 6 caracteres" : "";
        break;
      case "confirmPassword":
        
        error =
          value !== formValuesRegister.password ? "Senhas não conferem!" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValuesRegister({ ...formValuesRegister, [name]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formValuesRegister);
    fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValuesRegister),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formValues);
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <S.Container>
        {register ? (
          <>
            <S.Form action="#">
              <h1>Login</h1>
              <span>Email:</span>
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <span>Password:</span>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="Senha"
              />

              <Button
                buttonType={BUTTON_TYPE_CLASSES.base}
                onClick={handleSubmit}
              >
                Entrar
              </Button>

              <GoogleLogin />
            </S.Form>
            <S.Register onClick={() => setRegister(!register)}>
              <h3>Não tem cadastro?</h3>
            </S.Register>
          </>
        ) : (
          <>
            <S.Form action="#">
              <h1>Cadastro</h1>
              <span>Nome:</span>
              <input
                type="text"
                name="name"
                onBlur={validateRegisterInput}
                value={formValuesRegister.name}
                onChange={handleRegisterChange}
              />
              {errors.name && <p>{errors.name}</p>}
              <span>Email:</span>
              <input
                type="email"
                name="email"
                value={formValuesRegister.email}
                onChange={handleRegisterChange}
              />
              <span>Senha:</span>
              <input
                type="password"
                name="password"
                onBlur={validateRegisterInput}
                value={formValuesRegister.password}
                onChange={handleRegisterChange}
              />
              {errors.password && <p>{errors.password}</p>}
              <span>Confirmar senha:</span>
              <input
                type="password"
                name="confirmPassword"
                onBlur={validateRegisterInput}
                value={formValuesRegister.confirmPassword}
                onChange={handleRegisterChange}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              
              <Button
                buttonType={BUTTON_TYPE_CLASSES.base}
                disabled
                onClick={handleRegisterSubmit}
              >
                Cadastrar
              </Button>
            </S.Form>
            <S.Register onClick={() => setRegister(!register)}>
              <h3>Já tem cadastro?</h3>
            </S.Register>
          </>
        )}
      </S.Container>
    </>
  );
};

export default SigninBody;
