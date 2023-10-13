import Head from 'next/head'
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "@/context/AuthContext";
import {useCheckTokenExpired} from "@/utils/instance";

export default function Home() {
  let {logoutUser} = useContext(AuthContext)
  let api = useCheckTokenExpired()

  useEffect(()=> {
    getProfile()
  }, [])

  let getProfile = async() =>{
    let response = await api.get('/api/clients/profile/')

    if(response.status === 200){
      console.log(response.data)
    }

  }

  return (
    <>
      <Head>
        <title>Project X</title>
      </Head>
      <main>
        <div className="container">
          <h1>
            Hello
          </h1>
          <Link href='/login'>Login</Link>
          <button onClick={logoutUser} className='btn btn-dark mt-4'>Logout</button>

        </div>
      </main>
    </>
  )
}
