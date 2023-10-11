import * as Yup from 'yup'

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain letters and digits'),
})