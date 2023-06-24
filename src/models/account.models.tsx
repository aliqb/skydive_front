import { UserPersonalInfo } from "./shared.models";

export interface CityDto {
  id: string;
  province: string;
  state: string;
  city: string;
}

export class City {
  constructor(
    public id: string,
    public state: string,
    public provice: string,
    public city: string
  ) {}

  get locationString() {
    return `${this.state} - ${this.provice} - ${this.city}`;
  }
}

export interface DocumentItem {
  fileId: string;
  expirationDate?: string;
  status?: string;
  statusDisplay?: string;
  updatedAt?: string,
  createdAt?: string,
  id?:string
}

export interface PersonalInfoEditRequest extends Omit<UserPersonalInfo, "id"> {
  medicalDocument?: DocumentItem;
  logBookDocument?: DocumentItem;
  attorneyDocument?: DocumentItem;
  nationalCardDocument?: DocumentItem;
}

export interface DocumentsList {
  medicalDocument: DocumentItem | null;
  logBookDocument: DocumentItem | null;
  attorneyDocument: DocumentItem | null;
  nationalCardDocument: DocumentItem | null;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const  DocumnetStatus = {
  NOT_LOADED : "NotLoaded",
  PENDING : "Pending",
  EXPIRED : "Expired",
  CONFIRMED : "Confirmed",
}
