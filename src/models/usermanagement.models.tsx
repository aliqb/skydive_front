export interface User {
  id: string;
  username: string | null;
  phone: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface UserDatail {
  username: string;
  firstName: string;
  lastName: string;
  userTypeDisplay: string;
  userTypeId: string;
  nationalCode: string;
  birthDate: string;
  city: string;
  cityId: string;
  address: string;
  userCode: number;
  email: string;
  phone: string;
  height: number;
  weight: number;
  userStatus: string;
  userStatusDisplay: string;
  emergencyContact: string;
  emergencyPhone: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}


export interface CheckUserInfoRequest{
  id: string;
  isConfirmed: boolean;
}

export interface userType {
  isDefault: boolean
  title: string
  allowedTicketTypes: AllowedTicketType[]
  id: string
  createdAt: string
  updatedAt: string
}

interface AllowedTicketType {
  title: string
  id: string
  createdAt: string
  updatedAt: string
}


export interface UserRequest {
  firstName: string
  lastName: string
  nationalCode: string
  phone: string
  birthDate: string
  username: string
  email: string | null,
  cityId: string | null,
  address: string
  height: number
  weight: number
  emergencyContact: string
  emergencyPhone: string
  password: string,
  userTypeId: string
}