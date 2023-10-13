import {createContext, useState, useEffect, ReactNode} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {useRouter} from 'next/router';

type ErrorValues = {
  email?: string;
  password?: string;
};

type FormValues = {
  email: string;
  password: string;
};

const AuthContext = createContext(null);

export const parseLocalstorageData = (data: string) => JSON.parse(data)
export const stringifyLocalstorageData = (data : {access: string, refresh: string}) => JSON.stringify(data)
export  const decodeLocalstorageData = (data : string) => jwt_decode(data)

export default AuthContext;

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverErrors, setServerErrors] = useState<ErrorValues>({});
  const router = useRouter();

  useEffect(() => {
    const savedAuthTokens = localStorage.getItem('authTokens');

    if (savedAuthTokens) {
      setAuthTokens(parseLocalstorageData(savedAuthTokens));
    }
    setLoading(false);
  }, []);

  const loginUser = async (data: FormValues) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('http://192.168.0.87:8000/auth/jwt/create/', data, config);

      localStorage.setItem('authTokens', stringifyLocalstorageData(response.data));

      setAuthTokens(response.data);

      console.log('response', response.data);

      await router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverErrorsData = (error.response?.data || {}) as ErrorValues;
        setServerErrors(serverErrorsData);
      }
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem('authTokens');
  };


  const contextData = {
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
    serverErrors,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
