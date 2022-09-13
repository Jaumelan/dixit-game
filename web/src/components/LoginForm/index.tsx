import { useState } from "react";
import { Button } from "../../components";
import { BUTTON_TYPE_CLASSES } from "../Button";
import { BiShow, BiHide } from "react-icons/bi";
import { UserAuth } from "../../context/AuthContext";
import * as S from "./styles";

const LoginForm = () => {
  const { loginUser } = UserAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //console.log(formValues);
    loginUser(formValues);
  };

  return (
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
        <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={handleSubmit}>
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
    </S.Form>
  );
};

export default LoginForm;
