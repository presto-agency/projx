import React, {useState} from 'react';
import TextField from "@/ui/TextField/TextField";
import axios from "axios";
import Link from "next/link";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchemaLogin} from "@/utils/validation/validationSchemaLogin";

type FormValues = {
  email: string
  password: string
}

type ErrorValues = {
  email?: string
  password?: string
}

const defaultValues = {
  email: '',
  password: '',
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState:{errors}} = useForm<FormValues>({
    values: defaultValues,
    resolver: yupResolver(validationSchemaLogin)
  })

  const [serverErrors, setServerErrors] = useState<ErrorValues>({});

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setServerErrors({});
    try {
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }

      const response = await axios.post('http://192.168.0.87:8000/auth/jwt/create/',
        data ,
        config);

      localStorage.setItem('activationResponse', JSON.stringify(response.data));

      console.log('response', response)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverErrorsData = (error.response?.data || {}) as ErrorValues;
        setServerErrors(serverErrorsData);
      }
    }
  };


  return (
    <section className='d-flex justify-content-center align-items-center flex-column min-vh-100'>
      <div className='col-6'>
        <h1>
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column' action="#">
          <Controller
            control={control}
            name='email'
            render={({field})=>{
              return (
                <TextField
                  {...field}
                  label={'Email'}
                  error = {errors["email"]?.message || serverErrors["email"]}
                />
              )
            }}/>
          <Controller
            control={control}
            name='password'
            render={({field})=>{
              return (
                <TextField
                  {...field}
                  label={'Password'}
                  type='password'
                  error = {errors["password"]?.message  || serverErrors["password"]}
                />
              )
            }}/>
          <button className='btn btn-dark mt-4'>sign in</button>
        </form>
        <p>
          Have no account? <Link href='/registration'>Registration</Link>
        </p>
      </div>
    </section>
  );
};