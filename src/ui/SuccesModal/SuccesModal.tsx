import React from 'react';
import Link from "next/link";

const SuccesModal = () => {
  return (
    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className='position-fixed w-100 h-100 d-flex justify-content-center align-items-center'>
      <div className='text-primary text-center bg-white p-5'>
        <h1>
          Congratulation!
        </h1>
        <p>Please confirm it in your email</p>
        <Link className='btn btn-dark mt-4' href='/login'>Login</Link>
      </div>
    </div>
  );
};

export default SuccesModal;