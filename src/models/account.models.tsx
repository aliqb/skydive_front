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

export interface DocumentItem{
    fileId: string;
    expirationDate?: string;
    status?: string;
    statusDisplay?: string;
}

export interface PersonalInfoEditRequest extends Omit<UserPersonalInfo,'id'>{
    medicalDocument?: DocumentItem;
    logBookDocument?: DocumentItem;
    attorneyDocument?: DocumentItem;
    nationalCardDocument?: DocumentItem;
}

export interface DocumentsList{
  medicalDocument: DocumentItem;
  logBookDocument: DocumentItem;
  attorneyDocument: DocumentItem;
  nationalCardDocument: DocumentItem;
  id: string
  createdAt: string
  updatedAt: string
}