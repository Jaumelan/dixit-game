export interface GameSessionI {
  id: string;
  numberOfPlayers: number;
  players: { username: string; email: string }[];
  timePerTurn: number;
}
