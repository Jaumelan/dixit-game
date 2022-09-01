import { UserNameValidator, PasswordValidator, EmailValidator } from './';
import { UserModel } from '../models';

class UserDataValidator {
  public user: UserModel;
  public errors: string;

  private NameValidator = UserNameValidator;

  private EmailValidator = EmailValidator;

  private PasswordValidator = PasswordValidator;

  public constructor(user: UserModel) {
    this.errors = '';
    this.user = this.validate(user);
  }

  private validate(user: UserModel): UserModel {
    const { username, email, password } = user;

    const nameValidated = new this.NameValidator(username);
    const emailValidated = new this.EmailValidator(email);
    const passwordValidated = new this.PasswordValidator(password);

    this.errors =
      nameValidated.errors + emailValidated.errors + passwordValidated.errors;

    // console.log("userdata ", this.errors);
    const userValidated: UserModel = {
      username: nameValidated.userName,
      email: emailValidated.email,
      password: passwordValidated.password,
    };

    return userValidated;
  }
}

export { UserDataValidator };
