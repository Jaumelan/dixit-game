import { useState } from "react";
import { Button } from "../../components";
import { BUTTON_TYPE_CLASSES } from "../Button";
import { BiShow, BiHide } from "react-icons/bi";
import * as S from "./styles";
import { UserAuth } from "../../context/AuthContext";

const SignupForm = () => {
  const { registerUser } = UserAuth();
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateRegisterInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const onlyLettersRegex = /^[a-zA-Z]+$/;
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
      case "username":
        error = onlyLettersRegex.test(value)
          ? ""
          : "Nome de usuário deve conter apenas letras";
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

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValuesRegister({ ...formValuesRegister, [name]: value });
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
  };

  return (
    <S.Form action="#">
      <h1>Cadastro</h1>
      <span>Nome:</span>
      <S.UsernameContainer>
        <input
          type="text"
          name="username"
          onBlur={validateRegisterInput}
          value={formValuesRegister.username}
          onChange={handleRegisterChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </S.UsernameContainer>
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
  );
};

export default SignupForm;
