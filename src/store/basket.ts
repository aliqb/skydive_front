import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddingTicketItem,
  AddingTicketRequest,
  BaseResponse,
  BasketModel,
} from "../models/shared.models";
import { axiosIntance } from "../hooks/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { RootState } from ".";
import { toast } from "react-toastify";

interface BasketState {
  basket: BasketModel | null;
  loading: boolean;
  error: string;
  changingTicket:{
    flightLoadId: string,
    ticketTypeId: string
  } | null
}

const initialState: BasketState = {
  basket: null,
  loading: false,
  error: "",
  changingTicket: null
};

export const fetchBasket = createAsyncThunk("basket/fetchBasket", async () => {
  try {
    const response = await axiosIntance.get<
      null,
      AxiosResponse<BaseResponse<BasketModel>>
    >("/ShoppingCarts");
    return response.data.content;
  } catch (error) {
    const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
      message: string;
    }>;
    throw new Error(axiosError.response?.data.message || "");
  }
});

export const addTicketToBasket = createAsyncThunk(
  "basket/addTicket",
  async (ticket: AddingTicketItem, { dispatch, getState }) => {
    try {
      const basket = (getState() as RootState).basket.basket;
      const items: AddingTicketItem[] =
        basket?.items.map((item) => {
          return {
            flightLoadId: item.flightLoadId,
            ticketTypeId: item.ticketTypeId,
            userCode: item.userCode,
          };
        }) || [];
      items.push(ticket);
      const response = await axiosIntance.put<
        AddingTicketRequest,
        AxiosResponse<BaseResponse<BasketModel>>
      >("/Reservations", { items });
      toast.success(response.data.message);
      dispatch(fetchBasket());
      return response.data.content;
    } catch (error) {
      const axiosError: AxiosError<{ message: string }> = error as AxiosError<{
        message: string;
      }>;
      const message = axiosError.response?.data.message || "";
      toast.error(message);
      throw new Error(message);
    }
  }
);
// export const fetchBasket = ()

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasket.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
        state.basket = null;
      })
      .addCase(addTicketToBasket.pending, (state,action) => {
            state.changingTicket = {
                flightLoadId: action.meta.arg.flightLoadId,
                ticketTypeId: action.meta.arg.ticketTypeId
            }
      })
      .addCase(addTicketToBasket.fulfilled, (state) => {
            state.changingTicket = null;
      })
      .addCase(addTicketToBasket.rejected, (state) => {
        state.changingTicket = null;
      });
  },
  
});

export default basketSlice.reducer;
// export const basketAction
