import { FC, ButtonHTMLAttributes } from 'react';

import {
  BaseButton,
  GoogleSignInButton,
  BaseButtonDisabled,
  LogoutButton,
  ButtonSpinner,
  LoginSessionButton,
} from './styles';

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  logout = 'logout',
  disabled = 'disabled',
  LoginSession= 'login-session',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.logout]: LogoutButton,
    [BUTTON_TYPE_CLASSES.disabled]: BaseButtonDisabled,
    [BUTTON_TYPE_CLASSES.LoginSession]: LoginSessionButton,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
  
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps} >
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;