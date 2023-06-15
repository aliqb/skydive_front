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
  nationalcode: string;
  birthDate: string;
}
