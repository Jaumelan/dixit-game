class NumberOfPlayersValidator {
  public errors: string;

  public numberOfPlayers: number;

  private gameIdRegex = /^[0-9]*$/;

  public constructor(numberOfPlayers: number) {
    this.errors = '';
    this.numberOfPlayers = this.validate(numberOfPlayers);
  }

  private validate(numberOfPlayers: number): number {
    if (!numberOfPlayers) {
      this.errors +=
        'numberOfPlayers:O número de jogadores não pode ser vazio.|';
      return 0;
    }

    if (numberOfPlayers < 3) {
      this.errors +=
        'numberOfPlayers:O número de jogadores deve ser maior que 3.|';
      return 0;
    }

    if (numberOfPlayers > 6) {
      this.errors +=
        'numberOfPlayers:O número de jogadores deve ser menor que 6.|';
      return 0;
    }

    if (!this.gameIdRegex.test(numberOfPlayers.toString())) {
      this.errors +=
        'numberOfPlayers:O número de jogadores deve conter apenas números.|';
      return 0;
    }

    if (!numberOfPlayers.toString().trim()) {
      this.errors +=
        'numberOfPlayers:O número de jogadores não pode só conter espaços em branco.|';
      return 0;
    }

    //console.log('numberOfPlayers', numberOfPlayers);
    return Number(numberOfPlayers.toString().trim());
  }
}

export { NumberOfPlayersValidator };
