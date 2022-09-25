export interface GameSessionI {
  cards?: string;
  id: string;
  numberOfPlayers: number;
  pointsToWin: number;
  turns: number;
  players: { username: string; email: string }[];
  email?: string;
}
