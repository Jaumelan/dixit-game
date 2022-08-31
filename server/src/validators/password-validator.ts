class PasswordValidator {
  public errors: string;

  public password: string;

  private passwordRegex = /^[0-9]+$/;

  public constructor(password: string) {
    this.errors = '';
    this.password = this.validate(password);
  }

  private validate(password: string): string {
    if (!password) {
      this.errors += 'password:A senha não pode ser vazia.|';
      return '';
    }

    if (password.length < 10) {
      this.errors += 'password:A senha deve conter no mínimo 10 caracteres.|';
      return '';
    }

    if (password.length > 10) {
      this.errors += 'password:A senha deve conter no máximo 10 caracteres.|';
      return '';
    }

    if (!this.passwordRegex.test(password)) {
      this.errors += 'password:A senha deve conter só números.|';
      return '';
    }

    if (!password.trim()) {
      this.errors += 'password:A senha não pode só conter espaços em branco.|';
      return '';
    }

    return password.trim();
  }
}

export { PasswordValidator };
