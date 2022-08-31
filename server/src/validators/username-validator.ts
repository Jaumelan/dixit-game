class UserNameValidator {
  public errors: string;

  public userName: string;

  private nameRegex =
    /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;

  public constructor(userName: string) {
    this.errors = '';
    this.userName = this.validate(userName);
  }

  private validate(userName: string): string {
    if (!userName) {
      this.errors += 'name:O nome de usuário não pode ser vazio.|';
      return '';
    }

    if (userName.length < 3) {
      this.errors +=
        'name:O nome de usuário deve conter no mínimo 3 caracteres.|';
      return '';
    }

    if (userName.length > 20) {
      this.errors +=
        'name:O nome de usuário deve conter no máximo 20 caracteres.|';
      return '';
    }

    if (!this.nameRegex.test(userName)) {
      this.errors +=
        'name:O nome de usuário deve conter apenas letras e espaços.|';
      return '';
    }

    if (!userName.trim()) {
      this.errors +=
        'name:O nome de usuário não pode só conter espaços em branco.|';
      return '';
    }

    return userName.trim();
  }
}

export { UserNameValidator };
