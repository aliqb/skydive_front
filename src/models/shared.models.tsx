export interface LinkWithIcon {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export interface BaseResponse<T> {
  message: string;
  content: T;
  total: number;
}

export interface UserPersonalInfo {
  id: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  birthDate: string;
  email?: string;
  cityId?: string;
  state?: string;
  city?: string;
  address?: string;
  weight?: number;
  height?: number;
  createdAt?: string;
  updatedAt?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface UserGeneralInfo {
  code: string;
  userName: string;
  mobile: string;
  userStatus: string;
  userStatusDisplay: string;
  userType: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
}

export const UserStatuses = {
  AWAITING_COMPLETION: "AwaitingCompletion",
  PENDING: "Pending",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

export const UserStatusesPersianMap = new Map([
  [UserStatuses.AWAITING_COMPLETION, "در انتظار تکمیل"],
  [UserStatuses.PENDING, "در انتظار تایید"],
  [UserStatuses.ACTIVE, "فعال "],
  [UserStatuses.INACTIVE, "غیر فعال"],
]);

export const EventStatuses = {
  HELD: "AwaitingCompletion",
  PENDING: "Pending",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

export const EventStatusesPersianMap = new Map([
  [EventStatuses.HELD, "برگزار شده"],
  [EventStatuses.PENDING, "لغو شده"],
  [EventStatuses.ACTIVE, "آماده رزرو "],
  [EventStatuses.INACTIVE, "غیر قابل رزرو"],
]);

export interface BasketModel {
  ticketsCount: number;
  taxAmount: number;
  totalAmount: number;
  items: BasketTicketModel[];
  payableAmount: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BasketTicketModel {
  subjectToVAT: boolean;
  flightNumber: number;
  type: string;
  amount: number;
  userCode: string;
  flightLoadId: string;
  ticketTypeId: string;
}

export interface AggregatedTicket {
  flightLoadId: string;
  ticketTypeId: string;
  amount: number;
  type: string;
  flightNumber: number;
  ticketMembers:BasketTicketModel[]
}

export interface AddingTicketRequest {
  items: AddingTicketItem[];
}

export interface AddingTicketItem {
  flightLoadId: string;
  ticketTypeId: string;
  userCode: string | null;
}
