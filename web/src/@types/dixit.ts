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
  email: string;
  password: string;
  name: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
