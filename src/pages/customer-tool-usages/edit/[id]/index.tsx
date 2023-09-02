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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getCustomerToolUsageById, updateCustomerToolUsageById } from 'apiSdk/customer-tool-usages';
import { customerToolUsageValidationSchema } from 'validationSchema/customer-tool-usages';
import { CustomerToolUsageInterface } from 'interfaces/customer-tool-usage';
import { UserInterface } from 'interfaces/user';
import { ToolInterface } from 'interfaces/tool';
import { getUsers } from 'apiSdk/users';
import { getTools } from 'apiSdk/tools';

function CustomerToolUsageEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<CustomerToolUsageInterface>(
    () => (id ? `/customer-tool-usages/${id}` : null),
    () => getCustomerToolUsageById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CustomerToolUsageInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCustomerToolUsageById(id, values);
      mutate(updated);
      resetForm();
      router.push('/customer-tool-usages');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<CustomerToolUsageInterface>({
    initialValues: data,
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
              label: 'Update Customer Tool Usage',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Customer Tool Usage
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(CustomerToolUsageEditPage);
