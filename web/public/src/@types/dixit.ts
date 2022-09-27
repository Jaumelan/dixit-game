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

export type UpdateUserType = {
  email: string;
  username: string;
  //password?: string;
};

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
  //timePerTurn: number;
  players: PlayerType[];
  cards: string[];
  pointsToWin: number;
  turns: number;
};

export type TurnType = {
  username: string;
  email: string;
  played: boolean;
  messages: string[];
  cardsPlayed: string[];
  choseCard: boolean;
  hand: string[];
  choosenCard: string;
  score: number;
};

export type UpdateGameSetterType = {
  email: string;
  cardsPlayed: string;
  message: string;
};

export enum PLAYERTYPE {
  "CREATOR",
  "NEW-PLAYER",
  "NULL",
}

export type PlayContextType = {
  gameSetter: TurnType[] | null;
  cards: { username: string; hand: string[] }[] | null;
  sendDiscover: boolean;
  dixitPlayed: boolean;
  playing: boolean;
  playersSelectCards: boolean;
  playersName: string;
  otherPlayersChose: boolean;
  sendDixitName: boolean;
  discoverCard: boolean;
  dixitSwitch: boolean;
  everyonePlayed: boolean;
  sendScore: boolean;
  continuePlaying: boolean;
  constinueSocket: boolean;
  finishDixitSocket: boolean;
  handleSetGame: (data: TurnType[] | null) => void;
  handleSetCards: (data: { username: string; hand: string[] }[]) => void;
  UpdateOtherPlayersGameSetter: (data: {
    email: string;
    cardsPlayed: string;
  }) => void;
  handleUpdateGameSetter: (data: UpdateGameSetterType) => void;
  handleDixitPlayed: (data: boolean) => void;
  handleSetPlaying: (data: boolean) => void;
  handlePlayersSelectCards: (data: boolean) => void;
  handleSetPlayersName: (data: string) => void;
  handleOtherPlayersChose: (data: boolean) => void;
  handleUpdateDiscover: (data: { email: string; choosenCard: string }) => void;
  handleSetSendDiscover: (data: boolean) => void;
  UpdateOtherPlayersWithoutSwitch: (
    email: string,
    cardsPlayed: string[]
  ) => void;
  handleDixitSelection: (data: { email: string; card: string }) => void;
  handleDixitSwitch: (data: boolean) => void;
  handleCloseSendDixitName: () => void;
  handleUpdateDiscoverWithouSwitch: (data: {
    email: string;
    choosenCard: string;
  }) => void;
  handleSetPlayersNameWithoutSocket: (data: string) => void;
  handleUpdateScore: (
    data: { email: string; score: number }[],
    user: string
  ) => void;
  handleSendScore: (data: boolean) => void;
  handleSetDiscoverCard: (data: boolean) => void;
  handleEveryonePlayed: (data: boolean) => void;
  handleContinuePlaying:(data: boolean) => void;
  handleContinueSocket: (data: boolean) => void;
  nextRound: () => void;
  handleFinishSocket: (data: boolean) => void;
};
