import { UserStatuses } from "./shared.models";

export interface GenralSettings {
  termsAndConditionsUrl: string;
  userStatusInfo: UserStatusInfo[];
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStatusInfo {
  status: (typeof UserStatuses)[keyof typeof UserStatuses];
  description: string;
}
