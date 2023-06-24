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
}


export interface CheckUserInfoRequest{
  id: string;
  isConfirmed: boolean;
}