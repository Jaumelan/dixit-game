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
        this.errors += 'Player name can only contain letters. ';
      }

      if (playerName.length < 3) {
        this.errors += 'Player name must contain at least 3 characters. ';
      }

      if (playerName.length > 10) {
        this.errors += 'Player name must contain at most 10 characters. ';
      }

      if (!playerName.trim()) {
        this.errors += 'Player name cannot contain only spaces. ';
      }

      return playerName.trim();
    } else {
      return '';
    }
  }
}

export { PlayerNameValidator };
