import {
  NumberOfPlayersValidator,
  GameIdValidator,
  PlayersValidator,
  TurnsValidator,
  VictoryPointsValidator,
} from '.';
import { GameSessionI } from '../models';

class GameCreationValidator {
  public gameSession: GameSessionI;
  public errors: string;

  private NumberOfPlayersValidator = NumberOfPlayersValidator;

  private GameIdValidator = GameIdValidator;

  private PlayersValidator = PlayersValidator;

  private TurnsValidator = TurnsValidator;

  private VictoryPointsValidator = VictoryPointsValidator;

  public constructor(gameSession: GameSessionI) {
    this.errors = '';
    this.gameSession = this.validate(gameSession);
  }

  private validate(gameSession: GameSessionI): GameSessionI {
    const { id, numberOfPlayers, players, turns, pointsToWin } = gameSession;

    const numberOfPlayersValidated = new this.NumberOfPlayersValidator(
      numberOfPlayers,
    );
    const gameIdValidated = new this.GameIdValidator(id);
    const playersValidated = new this.PlayersValidator(players);
    const turnsValidated = new this.TurnsValidator(turns);
    const victoryPointsValidated = new this.VictoryPointsValidator(pointsToWin);

    this.errors =
      numberOfPlayersValidated.errors +
      gameIdValidated.errors +
      playersValidated.errors +
      turnsValidated.errors +
      victoryPointsValidated.errors;

    const gameSessionValidated: GameSessionI = {
      id: gameIdValidated.gameId,
      numberOfPlayers: numberOfPlayersValidated.numberOfPlayers,
      players: playersValidated.players,
      turns: turnsValidated.turns,
      pointsToWin: victoryPointsValidated.victoryPoints,
      email: gameSession.email,
    };

    return gameSessionValidated;
  }
}

export { GameCreationValidator };
