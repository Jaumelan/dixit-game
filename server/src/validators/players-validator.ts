class PlayersValidator {
  public errors: string;

  public players: string[];

  private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  public constructor(players: string[]) {
    this.errors = '';
    this.players = this.validate(players);
  }

  private validate(players: string[]): string[] {
    if (!players) {
      this.errors += 'players:Os jogadores não podem ser vazios.|';
      return [];
    }

    if (players.length < 1) {
      this.errors += 'players:Os jogadores devem ser no mínimo 1.|';
      return [];
    }

    if (players.length > 6) {
      this.errors += 'players:Os jogadores devem ser no máximo 6.|';
      return [];
    }

    players.forEach((player) => {
      if (!this.emailRegex.test(player)) {
        this.errors += 'players:O jogador deve ser um email.|';
        return [];
      }
    });

    if (!players.toString().trim()) {
      this.errors +=
        'players:Os jogadores não podem só conter espaços em branco.|';
      return [];
    }

    //console.log('players', players);
    return players;
  }
}

export { PlayersValidator };
