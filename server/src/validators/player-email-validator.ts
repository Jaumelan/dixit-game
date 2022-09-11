class PlayerEmailValidator {
  public errors: string;

  public email: string;

  private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  public constructor(email: string) {
    this.errors = '';
    this.email = this.validate(email);
  }

  private validate(email: string): string {
    if (email !== '') {
      if (!this.emailRegex.test(email)) {
        this.errors += 'Email is not valid. ';
      }

      return email.trim();
    } else {
      return '';
    }
  }
}

export { PlayerEmailValidator };
