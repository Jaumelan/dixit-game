import { UserNameValidator, PasswordValidator, EmailValidator } from './';
import { User } from '../models';

class UserDataValidator {
  public user: User;
  public errors: string;

  private NameValidator = UserNameValidator;

  private EmailValidator = EmailValidator;

  private PasswordValidator = PasswordValidator;

  public constructor(user: User) {
    this.errors = '';
    this.user = this.validate(user);
  }

  private validate(user: User): User {
    const { username, email, password } = user;

    const nameValidated = new this.NameValidator(username);
    const emailValidated = new this.EmailValidator(email);
    const passwordValidated = new this.PasswordValidator(password);

    this.errors =
      nameValidated.errors + emailValidated.errors + passwordValidated.errors;

    // console.log("userdata ", this.errors);
    const userValidated: User = {
      username: nameValidated.userName,
      email: emailValidated.email,
      password: passwordValidated.password,
    };

    return userValidated;
  }
}

export { UserDataValidator };
