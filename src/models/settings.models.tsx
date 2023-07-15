import { UserStatuses } from "./shared.models";

export interface GeneralSettings {
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

export interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}

export interface UnAssignTicketTypes {
  userTypeId: string;
  ticketTypeId: string;
}