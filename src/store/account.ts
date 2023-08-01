import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DocumentItem,
  DocumentItemModel,
  DocumentsList,
  DocumnetStatus,
} from "../models/account.models";
import { UserPersonalInfo } from "../models/shared.models";
import { sortDateComprator } from "../utils/shared";

function getLastDocument(
  documents: DocumentItem[] | null,
  withDate?: boolean
): DocumentItemModel {
  if (!documents) {
    return { fileId: "", withDate: withDate };
  }
  const createdComperator = sortDateComprator<DocumentItem>('createdAt');
  const expirationComperator = sortDateComprator<DocumentItem>('expirationDate');
  const sorted = documents.sort((a,b)=>{
    const createDiff = createdComperator(a,b);
    if(createDiff !==0){
      return createDiff
    }
    if(a.status === b.status){
      return expirationComperator(a,b)
    }
    const priorStatuses = [DocumnetStatus.EXPIRED,DocumnetStatus.PENDING]
    if(priorStatuses.includes(a.status as string)){
      return 1;
    }
    if(priorStatuses.includes(b.status as string)){
      return -1;
    }
    return 0
  })  
  return { ...sorted[sorted.length - 1], withDate: withDate };
}

interface AccountState {
  personalInfo: UserPersonalInfo | null;
  medicalDocument: DocumentItemModel;
  logBookDocument: DocumentItemModel;
  attorneyDocument: DocumentItemModel;
  nationalCardDocument: DocumentItemModel;
  anyDocChange: boolean;
}

const initialState: AccountState = {
  personalInfo: null,
  medicalDocument: { fileId: "", withDate: true },
  logBookDocument: { fileId: "" },
  attorneyDocument: { fileId: "", withDate: true },
  nationalCardDocument: { fileId: "" },
  anyDocChange: false,
};

export const UserDocumentsFields = {
  medicalDocument: "medicalDocument",
  logBookDocument: "logBookDocument",
  attorneyDocument: "attorneyDocument",
  nationalCardDocument: "nationalCardDocument",
} as const;

type keys = keyof typeof UserDocumentsFields;
export type UserDocumentsFieldType = (typeof UserDocumentsFields)[keys];

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<UserPersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setDocuments: (state, action: PayloadAction<DocumentsList>) => {
      const payload = action.payload;
      state.medicalDocument = getLastDocument(payload.medicalDocuments, true);
      state.logBookDocument = getLastDocument(payload.logBookDocuments);
      state.attorneyDocument = getLastDocument(payload.attorneyDocuments, true);
      state.nationalCardDocument = getLastDocument(
        payload.nationalCardDocuments
      );
    },
    setDocumnetFile: (
      state,
      action: PayloadAction<{ field: UserDocumentsFieldType; fileId: string }>
    ) => {
      const payload = action.payload;
      const document = state[action.payload.field];
      state.anyDocChange = true;
      if (!document) {
        state[action.payload.field] = {
          fileId: payload.fileId,
        };
      } else {
        document.fileId = payload.fileId;
      }
    },
    setDocumnetExpireDate: (
      state,
      action: PayloadAction<{ field: UserDocumentsFieldType; date: string }>
    ) => {
      const payload = action.payload;
      const document = state[action.payload.field];
      state.anyDocChange = true;
      if (!document) {
        state[action.payload.field] = {
          fileId: "",
          expirationDate: payload.date,
        };
      } else {
        document.expirationDate = payload.date;
      }
    },
  },
});

export const accoutnActions = accountSlice.actions;
export default accountSlice.reducer;
