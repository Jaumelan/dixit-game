class PlayerNameValidator {
  public errors: string;

  public playerName: string;

  private onlyLettersRegex = /^[a-zA-Z]+$/;

  public constructor(playerName: string) {
    this.errors = '';
    this.playerName = this.validate(playerName);
  }

  private validate(playerName: string): string {
    if (playerName !== '') {
      if (!this.onlyLettersRegex.test(playerName)) {
        this.errors += 'O nome do jogador deve conter só letras. ';
      }

      if (playerName.length < 3) {
        this.errors +=
          'O nome do jogador deve conter pelo menos 3 caracteres. ';
      }

      if (playerName.length > 12) {
        this.errors +=
          'O nome do jogador não deve conter mais de 12 caracteres. ';
      }

      if (!playerName.trim()) {
        this.errors += 'O nome do jogador não deve estar vazio. ';
      }

      return playerName.trim();
    } else {
      return '';
    }
  }
}

export { PlayerNameValidator };
