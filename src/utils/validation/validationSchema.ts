import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain letters and digits'),
  re_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})