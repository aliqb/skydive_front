import { BaseResponse } from "./shared.models";

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

export interface OTPRequest{
  username: string;
}

export type OTPResponse = BaseResponse<string>