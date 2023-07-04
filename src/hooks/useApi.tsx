import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { BaseResponse } from "../models/shared.models";
import { authActions } from "../store/auth";
export const axiosIntance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});
export default function useAPi<
  T,
  R = BaseResponse<any>,
  ErrorType = { message: string }
>() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorType | undefined>(undefined);
  const [data, setData] = useState<R | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const sendRequest = useCallback(async function (
    config: AxiosRequestConfig<T>,
    applyData?: (data: R) => void,
    onError?: (error: ErrorType | undefined) => void
  ) {
    setIsPending(true);
    try {
      const response = await axiosIntance.request<T, AxiosResponse<R>>(config);
      setData(response.data);
      if (applyData) {
        applyData(response.data);
      }
    } catch (error) {
      const axiosError: AxiosError<ErrorType> = error as AxiosError<ErrorType>;
      setErrors(axiosError.response?.data);
      if (onError) {
        onError(axiosError.response?.data);
      }
    } finally {
      setIsPending(false);
    }
  },
  []);
  // useEffect(()=>{
  //     console.log('f',token)
  //     axiosIntance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  // },[])
  useEffect(() => {
    if (token) {
      axiosIntance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(authActions.setHttpHeader());
    }
  }, [token,dispatch]);
  return { isPending, errors, sendRequest, data };
}
