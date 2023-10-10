import React, {FC, ChangeEvent} from 'react';

type TextFieldProps = {
  label: string,
  value: string,
  type?: string,
  onChange: (value: string) => void;
}

const TextField:FC<TextFieldProps> = ({label, value, type= 'text', onChange}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <label>
      <p>
        {label}
      </p>
      <input type={type} value={value} className='d-block w-100' onChange={handleChange} />
    </label>
  );
};

export default TextField;