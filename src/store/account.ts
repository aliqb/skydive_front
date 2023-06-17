import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentItem, DocumentsList } from "../models/account.models";
import { UserPersonalInfo } from "../models/shared.models";

interface AccountState{
    personalInfo: UserPersonalInfo | null;
    medicalDocument: DocumentItem | undefined;
    logBookDocument: DocumentItem | undefined;
    attorneyDocument: DocumentItem | undefined;
    nationalCardDocument: DocumentItem | undefined;
}

const initialState : AccountState = {
    personalInfo:  null,
    medicalDocument:  undefined,
    logBookDocument:  undefined,
    attorneyDocument:  undefined,
    nationalCardDocument:  undefined
}

export const UserDocumentsFields = {
    medicalDocument: 'medicalDocument',
    logBookDocument: 'logBookDocument',
    attorneyDocument: 'attorneyDocument',
    nationalCardDocument: 'nationalCardDocument'
} as const

type keys = keyof typeof UserDocumentsFields;
export type UserDocumentsFieldType = typeof UserDocumentsFields[keys]

const accountSlice = createSlice({
    name:'account',
    initialState: initialState,
    reducers:{
        setPersonalInfo:(state,action:PayloadAction<UserPersonalInfo>)=>{
            state.personalInfo = action.payload;
        },
        setDocuments:(state,action: PayloadAction<DocumentsList>)=>{
            const payload = action.payload;
            state.medicalDocument = payload.medicalDocument;
            state.logBookDocument = payload.logBookDocument;
            state.attorneyDocument = payload.attorneyDocument;
            state.nationalCardDocument = payload.nationalCardDocument;
        },
        setDocumnetFile:(state, action:PayloadAction<{field:UserDocumentsFieldType,fileId: string}>)=>{
            const payload = action.payload;
            const document = state[action.payload.field];
            if(!document){
                state[action.payload.field] = {
                    fileId: payload.fileId
                }
            }else{
                document.fileId = payload.fileId
            }
        },
        setDocumnetExpireDate:(state, action:PayloadAction<{field:UserDocumentsFieldType,date: string}>)=>{
            const payload = action.payload;
            const document = state[action.payload.field];
            if(!document){
                state[action.payload.field] = {
                    fileId: '',
                    expirationDate: payload.date
                }
            }else{
                document.expirationDate = payload.date
            }
        }
    }
})

export const accoutnActions = accountSlice.actions;
export default accountSlice.reducer;