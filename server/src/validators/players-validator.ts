import { PlayerNameValidator } from './player-name-validator';
import { PlayerEmailValidator } from './player-email-validator';

class PlayersValidator {
  public errors: string;

  public players: { username: string; email: string }[];

  private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  private UserNameValidator = PlayerNameValidator;

  private EmailValidator = PlayerEmailValidator;

  public constructor(players: { username: string; email: string }[]) {
    this.errors = '';
    this.players = this.validate(players);
  }

  private validate(
    players: { username: string; email: string }[],
  ): { username: string; email: string }[] {
    const playersValidated = players.map((player) => {
      const { username, email } = player;
      const usernameValidated = new this.UserNameValidator(username);
      const emailValidated = new this.EmailValidator(email);
      this.errors += usernameValidated.errors + emailValidated.errors;
      return {
        username: usernameValidated.playerName,
        email: emailValidated.email,
      };
    });
    return playersValidated;
  }
}

export { PlayersValidator };
