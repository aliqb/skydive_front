import axios, {AxiosRequestConfig} from "axios";
import { useCallback, useState, useEffect } from "react"
import { useAppSelector } from "./reduxHooks";
const axiosIntance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})
export default function useAPi<T>(){
    const [isPending, setIsPending] = useState<boolean>(false);
    const [errors,setErrors] = useState(null);
    const [data,setData] = useState<T|null>(null);
    const token = useAppSelector(state=>state.auth.token)
    const  sendRequest = useCallback(async function(config:AxiosRequestConfig<T>,applyData?: (data:T)=>void){
        setIsPending(true)
         try {
            const response = await axiosIntance.request<T>(config);
            console.log(response)
            setData(response.data)
            if(applyData){
                applyData(response.data)
            }
         } catch (error: any) {
            console.log(error)
            setErrors(error)
         }finally{
            setIsPending(false)
         }
    },[])
    useEffect(()=>{
        axiosIntance.defaults.headers.common['Authorization'] = token
    },[token])
    return {isPending, errors, sendRequest,data}
}