export interface AuthData {
  tokenType: string;
  authToken: string
  refreshToken: string;
  expiresIn: number;
}


export interface UserSecurityInformation{
    id: string;
    username: string;
    password: string;
}