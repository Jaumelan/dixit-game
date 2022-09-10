export interface IGoogleResponse {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  family_name: string;
  given_name: string;
  name: string;
  auth: { email: string; displayName: string };
}

export interface IRegisterUser {
  username: string;
  password: string;
  email: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export type PlayerType = {
  username: string;
  email: string;
};

export type GameContextType = {
  children: React.ReactNode;
};

export type GameDataType = {
  id: string;
  numberOfPlayers: number;
  timePerTurn: number;
  players: PlayerType[];
};