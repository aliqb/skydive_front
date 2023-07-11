import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentItemModel, DocumentsList } from "../models/account.models";
import { UserPersonalInfo } from "../models/shared.models";

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
      state.medicalDocument = payload.medicalDocument
        ? { ...payload.medicalDocument, withDate: true }
        : { fileId: "", withDate: true };
      state.logBookDocument = payload.logBookDocument || { fileId: "" };
      state.attorneyDocument = payload.attorneyDocument
        ? { ...payload.attorneyDocument, withDate: true }
        : { fileId: "", withDate: true };
      state.nationalCardDocument = payload.nationalCardDocument || {
        fileId: "",
      };
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
