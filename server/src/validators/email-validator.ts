class EmailValidator {
  public errors: string;

  public email: string;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public constructor(email: string) {
    this.errors = '';
    this.email = this.validate(email);
  }

  private validate(email: string): string {
    if (!email) {
      this.errors += 'email:O e-mail não pode ser vazio.|';
      return '';
    }

    if (!this.emailRegex.test(email)) {
      this.errors += 'email:O e-mail deve ser válido.|';
      return '';
    }

    if (!email.trim()) {
      this.errors += 'email:O e-mail não pode só conter espaços em branco.|';
      return '';
    }

    return email.trim();
  }
}

export { EmailValidator };
