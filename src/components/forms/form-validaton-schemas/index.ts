import * as Yup from 'yup';

export const emailSchema = Yup.string().email('Invalid Email').trim().required('Email is required');
export const passwordSchema = Yup.string().required('Password is required');

export const registerPasswordSchema = Yup.string()
  .length(6, 'Password needs to be at least 6 characters in length.')
  .required('Password is required');

export const confirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm password is required');
Yup.string().notRequired();

export const termsAndConditionsSchema = Yup.bool()
  .oneOf([true])
  .required('You have to accept the terms to register an account');
