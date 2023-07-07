import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserMessage, UserMessageResponse } from "../models/messages.models";
import { axiosIntance } from "../hooks/useApi";
import { AxiosError, AxiosResponse } from "axios";
import {  PagingParams } from "../models/shared.models";

interface MessagesState{
    messages:UserMessage[],
    total: number,
    unReadCount: number,
    isLoading: boolean,
    error: string
}

const initialState : MessagesState = {
    messages: [],
    unReadCount: 0,
    total: 0,
    error: '',
    isLoading: false
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages',async (pagingParmas:Partial<PagingParams> )=>{
    try {
        const response = await axiosIntance.get<
          null,
          AxiosResponse<UserMessageResponse>
        >("/UserMessages",{
            params:{
                pageIndex: pagingParmas.pageIndex || 1,
                pageSize: pagingParmas.pageSize || 10
            }
        });
        return response.data;
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
            state.messages = action.payload.content
            state.total = action.payload.total
            state.unReadCount = action.payload.notVisited
        })
        builder.addCase(fetchMessages.rejected,(state,action)=>{
            state.error = action.error.message || "";
            state.isLoading = false;
            state.messages = []
        })
    }
})

export default messgeSlice.reducer

