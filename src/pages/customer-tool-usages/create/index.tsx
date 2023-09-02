import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCustomerToolUsage } from 'apiSdk/customer-tool-usages';
import { customerToolUsageValidationSchema } from 'validationSchema/customer-tool-usages';
import { UserInterface } from 'interfaces/user';
import { ToolInterface } from 'interfaces/tool';
import { getUsers } from 'apiSdk/users';
import { getTools } from 'apiSdk/tools';
import { CustomerToolUsageInterface } from 'interfaces/customer-tool-usage';

function CustomerToolUsageCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerToolUsageInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomerToolUsage(values);
      resetForm();
      router.push('/customer-tool-usages');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerToolUsageInterface>({
    initialValues: {
      usage_count: 0,
      last_used_at: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
      tool_id: (router.query.tool_id as string) ?? null,
    },
    validationSchema: customerToolUsageValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Customer Tool Usages',
              link: '/customer-tool-usages',
            },
            {
              label: 'Create Customer Tool Usage',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Customer Tool Usage
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Usage Count"
            formControlProps={{
              id: 'usage_count',
              isInvalid: !!formik.errors?.usage_count,
            }}
            name="usage_count"
            error={formik.errors?.usage_count}
            value={formik.values?.usage_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('usage_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_used_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Used At
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_used_at ? new Date(formik.values?.last_used_at) : null}
              onChange={(value: Date) => formik.setFieldValue('last_used_at', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<ToolInterface>
            formik={formik}
            name={'tool_id'}
            label={'Select Tool'}
            placeholder={'Select Tool'}
            fetcher={getTools}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/customer-tool-usages')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'customer_tool_usage',
    operation: AccessOperationEnum.CREATE,
  }),
)(CustomerToolUsageCreatePage);
