import * as yup from 'yup';

export const inviteValidationSchema = yup.object().shape({
  invited_user_id: yup.string().nullable().required(),
  inviting_user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
