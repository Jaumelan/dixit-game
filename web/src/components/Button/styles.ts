import styled from "styled-components";
import Google from "../../assets/images/google.png";
import { SpinnerContainer } from "../Spinner/styles";

export const BaseButton = styled.button`
  @-webkit-keyframes scale-up-center {
    0% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes scale-up-center {
    0% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: #cfb521;
  color: black;
  text-transform: uppercase;
  font-weight: bolder;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  align-items: center;
  &:hover {
    background-color: #ffcd45;
    box-shadow: 0 0 2px 2px #000;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-image: url(${Google});
  width: 192px;
  height: 46px;

  background-size: fit;
  color: none;
  font-size: 14px;
  line-height: 25px;
  background-color: #fff;
  &:hover {
    background-color: none;
    border: none;
  }
`;

export const LogoutButton = styled(BaseButton)`
  background-color: #c0c0c0;
  color: black;
  border: none;

  &:hover {
    background-color: black;
    color: white;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`;

export const BaseButtonDisabled = styled(BaseButton)`
  background-color: #c0c0c0;
  color: black;
  border: none;
  cursor: not-allowed;
`;

export const LoginSessionButton = styled(BaseButton)`
  min-width: 110px;
  width: auto;
`;
