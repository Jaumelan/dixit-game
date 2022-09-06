/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEventHandler, useState } from "react";
import * as S from "./styles";
import { Button } from "../../components";
import { BUTTON_TYPE_CLASSES } from "../Button";
import GoogleLogin from "../../components/GoogleLogin";
import { BiShow, BiHide } from "react-icons/bi";
import { UserAuth } from "../../context/AuthContext";

const SigninBody = () => {
  const { registerUser, loginUser } = UserAuth();
  const [register, setRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formValuesRegister, setFormValuesRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateRegisterInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let error = "";
    switch (name) {
      case "email":
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
    enableButtonRegister();
  };

  const enableButtonRegister = () => {
    if (
      formValuesRegister.username &&
      formValuesRegister.email &&
      formValuesRegister.password &&
      formValuesRegister.confirmPassword &&
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
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
    //console.log(formValuesRegister);
    const data = {
      username: formValuesRegister.username,
      email: formValuesRegister.email,
      password: formValuesRegister.password,
    };

    registerUser(data);
    /*
    fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValuesRegister),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

      })
      .catch((err) => console.log(err));
      */
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formValues);
    loginUser(formValues);
    /*
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
      */
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
              <S.PasswordContainer>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  placeholder="Senha"
                />
                {showPassword ? (
                  <BiHide
                    onClick={() => setShowPassword(!showPassword)}
                    size={20}
                    color="#000"
                  />
                ) : (
                  <BiShow
                    onClick={() => setShowPassword(!showPassword)}
                    size={20}
                    color="#000"
                  />
                )}
              </S.PasswordContainer>
              {formValues.email && formValues.password ? (
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.base}
                  onClick={handleSubmit}
                >
                  Entrar
                </Button>
              ) : (
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.disabled}
                  onClick={handleSubmit}
                  disabled
                >
                  Entrar
                </Button>
              )}

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
                name="username"
                onBlur={validateRegisterInput}
                value={formValuesRegister.username}
                onChange={handleRegisterChange}
              />
              {errors.username && <p>{errors.username}</p>}
              <span>Email:</span>
              <S.EmailContainer>
                <input
                  type="email"
                  name="email"
                  onBlur={validateRegisterInput}
                  value={formValuesRegister.email}
                  onChange={handleRegisterChange}
                />

                {errors.email && <p>{errors.email}</p>}
              </S.EmailContainer>

              <span>Senha:</span>
              <S.PasswordContainer>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onBlur={validateRegisterInput}
                  value={formValuesRegister.password}
                  onChange={handleRegisterChange}
                />
                {showPassword ? (
                  <BiHide
                    onClick={() => setShowPassword(!showPassword)}
                    size={20}
                    color="#000"
                  />
                ) : (
                  <BiShow
                    onClick={() => setShowPassword(!showPassword)}
                    size={20}
                    color="#000"
                  />
                )}
                {errors.password && <p>{errors.password}</p>}
              </S.PasswordContainer>

              <span>Confirmar senha:</span>
              <S.PasswordContainer>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  onBlur={validateRegisterInput}
                  value={formValuesRegister.confirmPassword}
                  onChange={handleRegisterChange}
                />
                {showConfirmPassword ? (
                  <BiHide
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    size={20}
                    color="#000"
                  />
                ) : (
                  <BiShow
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    size={20}
                    color="#000"
                  />
                )}
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              </S.PasswordContainer>
              {enableButton ? (
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.base}
                  onClick={handleRegisterSubmit}
                >
                  Cadastrar
                </Button>
              ) : (
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.disabled}
                  onClick={handleRegisterSubmit}
                >
                  Cadastrar
                </Button>
              )}
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
