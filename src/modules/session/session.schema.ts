import { object, string } from 'yup';

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 4 chars minimum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),

    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
  }),
});
