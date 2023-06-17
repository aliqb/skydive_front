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
  email?: string
  cityId?: string,
  state?: string,
  city?: string,
  address?: string,
  weight?: number,
  height?: number,
  createdAt?: string
  updatedAt?: string,
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
  AWAITING_COMPLETION: 'AwaitingCompletion',
  PENDING: 'Pending',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
} 