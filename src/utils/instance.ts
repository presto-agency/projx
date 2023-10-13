import axios from 'axios'
import dayjs from 'dayjs'
import AuthContext, {decodeLocalstorageData, stringifyLocalstorageData} from "@/context/AuthContext";
import {useContext} from "react";

const baseURL = 'http://192.168.0.87:8000'

export const useCheckTokenExpired = () => {
  const {authTokens, setAuthTokens} = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `JWT ${authTokens?.access}`}
  });


  axiosInstance.interceptors.request.use(async req => {

    const decodedAccess = decodeLocalstorageData(authTokens.access)

    const isExpired = dayjs.unix(decodedAccess.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/auth/jwt/refresh/`, {
      refresh: authTokens.refresh
    });

    localStorage.setItem('authTokens', stringifyLocalstorageData(response.data))

    setAuthTokens(response.data)

    req.headers.Authorization = `JWT ${response.data.access}`
    return req
  })

  return axiosInstance
}


