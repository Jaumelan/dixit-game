class TimePerTurnValidator {
  public errors: string;

  public timePerTurn: number;

  private timePerTurnRegex = /^[0-9]*$/;

  public constructor(timePerTurn: number) {
    this.errors = '';
    this.timePerTurn = this.validate(timePerTurn);
  }

  private validate(timePerTurn: number): number {
    if (!timePerTurn) {
      this.errors += 'timePerTurn:O tempo por turno não pode ser vazio.|';
      return 0;
    }

    if (timePerTurn < 10) {
      this.errors += 'timePerTurn:O tempo por turno deve ser maior que 10.|';
      return 0;
    }

    if (timePerTurn > 30) {
      this.errors += 'timePerTurn:O tempo por turno deve ser menor que 30.|';
      return 0;
    }

    if (!this.timePerTurnRegex.test(timePerTurn.toString())) {
      this.errors +=
        'timePerTurn:O tempo por turno deve conter apenas números.|';
      return 0;
    }

    if (!timePerTurn.toString().trim()) {
      this.errors +=
        'timePerTurn:O tempo por turno não pode só conter espaços em branco.|';
      return 0;
    }

    //console.log('timePerTurn', timePerTurn);
    return Number(timePerTurn.toString().trim());
  }
}

export { TimePerTurnValidator };
