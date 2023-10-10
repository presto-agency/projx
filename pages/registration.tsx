import React, {FormEvent, useState} from 'react';
import { useRouter } from 'next/router';
import TextField from "@/ui/TextField/TextField";
import axios from "axios";

export default function Registration() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = name;
    const userEmail = email;
    const userPassword = password;

    try {

      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }

      const  body = {
        first_name: username,
        last_name: 'hello',
        email: userEmail,
        password: userPassword,
        re_password: userPassword,
      }

      const response = await axios.post('http://192.168.0.87:8000/auth/users/',body , config
        );

      console.log('Відповідь сервера:', response.data);

      router.push('/login');
    } catch (error) {
      console.error('Помилка при відправці на сервер:', error);
      setError('Помилка при реєстрації. Спробуйте ще раз.');
    }
  };

  return (
    <section className='d-flex justify-content-center align-items-center flex-column min-vh-100'>
      <div className='col-6'>
        <h1>Registration</h1>
        <form onSubmit={registration} className='d-flex flex-column' action="#">
          <TextField
            label={'Username'}
            value={name}
            onChange={(value) => setName(value)}
          />
          <TextField
            label={'Email'}
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <TextField
            label={'Password'}
            type='password'
            value={password}
            onChange={(value) => setPassword(value)}
          />
          <div className="text-danger">{error}</div>
          <button className='btn btn-dark mt-4'>Registration</button>
        </form>
      </div>
    </section>
  );
};
