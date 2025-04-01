
interface IToken {
  token: string;
  expiration: number;
}

export interface ITokenDto {
  accessToken: IToken;
  refreshToken: IToken;
}
