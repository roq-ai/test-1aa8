import * as yup from 'yup';

export const customerToolUsageValidationSchema = yup.object().shape({
  usage_count: yup.number().integer().nullable(),
  last_used_at: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  tool_id: yup.string().nullable().required(),
});
