class VictoryPointsValidator {
  public errors: string;

  public victoryPoints: number;

  private victoryPointsRegex = /^[0-9]*$/;

  public constructor(victoryPoints: number) {
    this.errors = '';
    this.victoryPoints = this.validate(victoryPoints);
  }

  private validate(victoryPoints: number): number {
    /* if (!victoryPoints) {
      this.errors +=
        'victoryPoints:O número de pontos de vitória não pode ser vazio.|';
      return 0;
    } */

    if (
      victoryPoints !== 0 &&
      victoryPoints !== 10 &&
      victoryPoints !== 15 &&
      victoryPoints !== 20
    ) {
      this.errors +=
        'victoryPoints:O número de pontos de vitória deve ser 0, 10, 15 ou 20.|';
      return 0;
    }

    if (!this.victoryPointsRegex.test(victoryPoints.toString())) {
      this.errors +=
        'victoryPoints:O número de pontos de vitória deve conter apenas números.|';
      return 0;
    }

    if (!victoryPoints.toString().trim()) {
      this.errors +=
        'victoryPoints:O número de pontos de vitória não pode só conter espaços em branco.|';
      return 0;
    }

    //console.log('victoryPoints', victoryPoints);
    return Number(victoryPoints.toString().trim());
  }
}

export { VictoryPointsValidator };
