import * as yup from 'yup';

export const apiKeyValidationSchema = yup.object().shape({
  key_value: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
