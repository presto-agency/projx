import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";

const Token = () => {

  const router = useRouter()
  const [error, setError] = useState('');

  useEffect(() => {
    const sendData = async () => {
      try {

        const {uid = null, token= null} = router.query
        if(uid && token){
          const config = {
            headers : {
              'Content-Type' : 'application/json'
            }
          }
          const response = await axios.post('http://192.168.0.87:8000/auth/users/activation/', {uid, token}, config);
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
          setError(error.message)
        }
      }
    }

  sendData()

  }, [router])
  return (
    <div>
      <h1>
        {
          error.length > 0 ? error : 'You are successfully activated!'
        }
      </h1>
      <Link className='btn btn-dark mt-4' href='/login'>Login</Link>
    </div>
  );
};

export default Token;