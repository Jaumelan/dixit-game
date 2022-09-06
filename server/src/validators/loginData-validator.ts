import { EmailValidator, PasswordValidator } from './';
import { LoginRequisition } from '../models';

class LoginDataValidator {
  public loginData: LoginRequisition;
  public errors: string;

  private EmailValidator = EmailValidator;

  private PasswordValidator = PasswordValidator;

  public constructor(loginData: LoginRequisition) {
    this.errors = '';
    this.loginData = this.validate(loginData);
  }

  private validate(loginData: LoginRequisition): LoginRequisition {
    const { email, password } = loginData;

    const emailValidated = new this.EmailValidator(email);
    const passwordValidated = new this.PasswordValidator(password);

    this.errors = emailValidated.errors + passwordValidated.errors;

    const loginDataValidated: LoginRequisition = {
      email: emailValidated.email,
      password: passwordValidated.password,
    };

    return loginDataValidated;
  }
}

export { LoginDataValidator };
