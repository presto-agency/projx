import React, {useState} from 'react';
import { useRouter } from 'next/router';
import TextField from "@/ui/TextField/TextField";
import axios from "axios";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {validationSchema} from "@/utils/validation/validationSchema";
import { yupResolver } from '@hookform/resolvers/yup'
import SuccesModal from "@/ui/SuccesModal/SuccesModal";

type FormValues = {
  first_name: string
  last_name: string
  email: string
  password: string
  re_password: string
}

type ErrorValues = {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  re_password?: string
}

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  re_password: '',
}

export default function Registration() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState:{errors}} = useForm<FormValues>({
    values: defaultValues,
    resolver: yupResolver(validationSchema)
  })
  const [serverErrors, setServerErrors] = useState<ErrorValues>({});
  const [modal, setModal] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setServerErrors({});

    try {
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }

      const response = await axios.post('http://192.168.0.87:8000/auth/users/',
        data ,
        config);

      setModal(true)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverErrorsData = (error.response?.data || {}) as ErrorValues;
        setServerErrors(serverErrorsData);
      }
    }
  };

  return (
    <section className='d-flex justify-content-center align-items-center flex-column min-vh-100'>
      { modal && <SuccesModal/>}
      <div className='col-6'>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
          <Controller
            control={control}
            name='first_name'
            render={({field})=>{
            return (
              <TextField
                {...field}
                label={'First name'}
                error = {errors["first_name"]?.message || serverErrors["first_name"]}
              />
            )
          }}/>
          <Controller
            control={control}
            name='last_name'
            render={({field})=>{
              return (
                <TextField
                  {...field}
                  label={'Last name'}
                  error = {errors["last_name"]?.message  || serverErrors["last_name"]}
                />
              )
            }}/>
          <Controller
            control={control}
            name='email'
            render={({field})=>{
              return (
                <TextField
                  {...field}
                  label={'Email'}
                  error = {errors["email"]?.message  || serverErrors["email"]}
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
          <Controller
            control={control}
            name='re_password'
            render={({field})=>{
              return (
                <TextField
                  {...field}
                  label={'Re password'}
                  type='password'
                  error = {errors["re_password"]?.message  || serverErrors["re_password"]}
                />
              )
            }}/>
          <button className='btn btn-dark mt-4'>Registration</button>
        </form>
      </div>
    </section>
  );
};
