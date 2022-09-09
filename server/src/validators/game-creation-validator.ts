import {
  NumberOfPlayersValidator,
  GameIdValidator,
  PlayersValidator,
  TimePerTurnValidator,
} from '.';
import { GameSessionI } from '../models';

class GameCreationValidator {
  public gameSession: GameSessionI;
  public errors: string;

  private NumberOfPlayersValidator = NumberOfPlayersValidator;

  private GameIdValidator = GameIdValidator;

  private PlayersValidator = PlayersValidator;

  private TimePerTurnValidator = TimePerTurnValidator;

  public constructor(gameSession: GameSessionI) {
    this.errors = '';
    this.gameSession = this.validate(gameSession);
  }

  private validate(gameSession: GameSessionI): GameSessionI {
    const { id, numberOfPlayers, players, timePerTurn } = gameSession;

    const numberOfPlayersValidated = new this.NumberOfPlayersValidator(
      numberOfPlayers,
    );
    const gameIdValidated = new this.GameIdValidator(id);
    const playersValidated = new this.PlayersValidator(players);
    const timePerTurnValidated = new this.TimePerTurnValidator(timePerTurn);

    this.errors =
      numberOfPlayersValidated.errors +
      gameIdValidated.errors +
      playersValidated.errors +
      timePerTurnValidated.errors;

    const gameSessionValidated: GameSessionI = {
      id: gameIdValidated.gameId,
      numberOfPlayers: numberOfPlayersValidated.numberOfPlayers,
      players: playersValidated.players,
      timePerTurn: timePerTurnValidated.timePerTurn,
    };

    return gameSessionValidated;
  }
}

export { GameCreationValidator };
