export interface GameSessionI {
  id: string;
  numberOfPlayers: number;
  players: string[];
  timePerTurn: number;
}
