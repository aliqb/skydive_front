import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddingTicketItem,
  AddingTicketRequest,
  AggregatedTicket,
  BaseResponse,
  BasketModel,
  BasketTicketModel,
} from "../models/shared.models";
import { axiosIntance } from "../hooks/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { RootState } from ".";
import { toast } from "react-toastify";

class TicketAggregator {
  private _aggreateds: AggregatedTicket[] = [];
  constructor(basketTickets: BasketTicketModel[]= []) {
    if(basketTickets.length === 0){
        return
    }
    basketTickets.forEach((item) => {
      const findedAggregate = this._aggreateds.find(
        (agg) =>
          agg.flightLoadId === item.flightLoadId &&
          agg.ticketTypeId === item.ticketTypeId
      );
      if (findedAggregate) {
        findedAggregate.amount += item.amount;
        findedAggregate.ticketMembers.push(item);
      } else {
        const aggregated: AggregatedTicket = {
          flightLoadId: item.flightLoadId,
          flightNumber: item.flightNumber,
          ticketTypeId: item.ticketTypeId,
          type: item.type,
          amount: item.amount,
          ticketMembers: [item],
        };
        this._aggreateds.push(aggregated);
      }
    });
  }
  get aggregateds(){
    return this._aggreateds
  }
}

interface BasketState {
  basket: BasketModel | null;
  loading: boolean;
  error: string;
}

const initialState: BasketState = {
  basket: null,
  loading: false,
  error: "",
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
      });
  },
});

export default basketSlice.reducer;
// export const basketAction
