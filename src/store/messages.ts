import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserMessage } from "../models/messages.models";
import { axiosIntance } from "../hooks/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { BaseResponse, PagingParams } from "../models/shared.models";

interface MessagesState{
    messages:UserMessage[],
    unReadCount: number,
    isLoading: boolean,
    error: string
}

const initialState : MessagesState = {
    messages: [],
    unReadCount: 0,
    error: '',
    isLoading: false
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages',async (pagingParmas:Partial<PagingParams> )=>{
    try {
        const response = await axiosIntance.get<
          null,
          AxiosResponse<BaseResponse<UserMessage[]>>
        >("/UserMessages",{
            params:{
                pageIndex: pagingParmas.pageIndex || 1,
                pageSize: pagingParmas.pageSize || 10
            }
        });
        return response.data.content;
      } catch (error) {
        const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
          message: string;
        }>;
        throw new Error(axiosError.response?.data.message || "");
      }
})

const messgeSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchMessages.pending,(state)=>{
            state.error = '';
            state.isLoading = true;
        })
        builder.addCase(fetchMessages.fulfilled,(state,action)=>{
            state.error= "";
            state.isLoading = false;
            state.messages = action.payload
        })
        builder.addCase(fetchMessages.rejected,(state,action)=>{
            state.error = action.error.message || "";
            state.isLoading = false;
            state.messages = []
        })
    }
})

export default messgeSlice.reducer

