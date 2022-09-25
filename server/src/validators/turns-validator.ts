class TurnsValidator {
  public errors: string;

  public turns: number;

  private turnsRegex = /^[0-9]*$/;

  public constructor(turns: number) {
    this.errors = '';
    this.turns = this.validate(turns);
  }

  private validate(turns: number): number {
    /* if (!turns) {
      console.log('turns', turns);
      this.errors += 'turns:O número de turnos não pode ser vazio.|';
      return 0;
    } */

    if (turns !== 0 && turns !== 2) {
      this.errors += 'turns:O número de turnos deve ser 0 ou 2.|';
      return 0;
    }

    if (!this.turnsRegex.test(turns.toString())) {
      this.errors += 'turns:O número de turnos deve conter apenas números.|';
      return 0;
    }

    if (!turns.toString().trim()) {
      this.errors +=
        'turns:O número de turnos não pode só conter espaços em branco.|';
      return 0;
    }

    //console.log('turns', turns);
    return Number(turns.toString().trim());
  }
}

export { TurnsValidator };
