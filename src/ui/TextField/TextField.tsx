import React, {ChangeEvent, forwardRef, ForwardedRef} from 'react';

type TextFieldProps = {
  label: string,
  value?: string,
  type?: string,
  error?: string,
  onChange: (value: string) => void;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({
                       label,
                       value,
                       type = 'text',
                       error,
                       onChange
                     }: TextFieldProps,
                     ref: ForwardedRef<HTMLInputElement>) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    }

    return (
      <label>
        <p>
          {label}
        </p>
        <input ref={ref} type={type} value={value} className='d-block w-100' onChange={handleChange}/>
        {error && <div className="text-danger">{error}</div>}
      </label>
    )
  }
)

export default TextField;