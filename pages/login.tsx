import React, {useContext, useState} from 'react';
import TextField from "@/ui/TextField/TextField";
import axios from "axios";
import Link from "next/link";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchemaLogin} from "@/utils/validation/validationSchemaLogin";
import AuthContext from "@/context/AuthContext";

type FormValues = {
  email: string
  password: string
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

  let {loginUser, serverErrors} = useContext(AuthContext)


  return (
    <section className='d-flex justify-content-center align-items-center flex-column min-vh-100'>
      <div className='col-6'>
        <h1>
          Login
        </h1>
        <form onSubmit={handleSubmit(loginUser)} className='d-flex flex-column' action="#">
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