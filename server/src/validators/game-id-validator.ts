class GameIdValidator {
  public errors: string;

  public gameId: string;

  private gameIdRegex = /^[0-9]*$/;

  public constructor(gameId: string) {
    this.errors = '';
    this.gameId = this.validate(gameId);
  }

  private validate(gameId: string): string {
    if (!gameId) {
      this.errors += 'gameId:O id do jogo não pode ser vazio.|';
      return '';
    }

    if (gameId.length > 4) {
      this.errors += 'gameId:O id do jogo deve conter no máximo 4 caracteres.|';
      return '';
    }

    if (!this.gameIdRegex.test(gameId)) {
      this.errors += 'gameId:O id deve conter apenas números.|';
      return '';
    }

    if (!gameId.trim()) {
      this.errors +=
        'gameId:O id do jogo não pode só conter espaços em branco.|';
      return '';
    }

    //console.log('gameId', gameId);
    return gameId.trim();
  }
}

export { GameIdValidator };
