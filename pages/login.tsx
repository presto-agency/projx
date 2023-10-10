import React from 'react';
import TextField from "@/ui/TextField/TextField";
import axios from "axios";
import Link from "next/link";

export default function Login() {
  return (
    <section className='d-flex justify-content-center align-items-center flex-column min-vh-100'>
      <div className='col-6'>
        <h1>
          Login
        </h1>
        <form className='d-flex flex-column' action="#">
          <TextField label={'Username'}/>
          <TextField label={'Password'}/>
          <button className='btn btn-dark mt-4'>sign in</button>
        </form>
        <p>
          Have no account? <Link href='/registration'>Registration</Link>
        </p>
      </div>
    </section>
  );
};

// export const getServerSideProps = async () => {
//   try {
//     const response = await axios.get('http://192.168.0.87:8000/api/blog/posts/');
//     const data = response.data;
//
//     return { props: { data } }; // Оновлена структура даних
//   } catch (error) {
//     console.error(error);
//     return { props: { data: [] } }; // Оновлена структура даних
//   }
// }