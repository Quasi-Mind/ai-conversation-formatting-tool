import React from 'react';
import { useFormikContext } from 'formik';
import InputField from './InputField/InputField';
import {
  Stack,
  Checkbox,
  Text,
  Heading,
} from '@chakra-ui/react';
import ParameterField from './ParameterField';


const ParameterFields = () => {
  const { errors, touched, values, initialValues } = useFormikContext();

  return (
    <Stack as="section" id="parameter-fields" spacing={3} mt={3}>
      <Heading  as="h2">Parameters</Heading>
      <Stack spacing={3} p={3} bg="gray.100" shadow="sm" borderColor="gray.300" borderWidth={1} borderStyle="solid" borderRadius={4}>
        <InputField
          as={Checkbox}
          size="lg"
          borderColor="gray.400"
          label="Did you modify the parameters(eg. temp, sampling)?"
          name="showParams"
        />

        {values.showParams && (
          <>
            <Text>Select all that apply</Text>

            <ParameterField
              label="Temperature"
              name="temperature"
              defaultValue={initialValues.temperature}
              step={0.01}
            />

            <ParameterField
              label="Maimum Tokens"
              name="maxTokens"
              step={1}
              precision={0}
              defaultValue={initialValues.maxTokens}
            />

            <ParameterField
              label="Top P"
              name="topP"
              step={0.01}
              isInvalid={errors.topP && touched.topP}
              defaultValue={initialValues.topP}
            />

            <ParameterField
              label="Frequency penalty"
              name="frequencyPenalty"
              step={0.01}
              isInvalid={errors.frequencyPenalty && touched.frequencyPenalty}
              defaultValue={initialValues.frequencyPenalty}
            />

            <ParameterField
              label="Presence penalty"
              name="presencePenalty"
              step={0.01}
              isInvalid={errors.presencePenalty && touched.presencePenalty}
              defaultValue={initialValues.presencePenalty}
            />
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default ParameterFields;