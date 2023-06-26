
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import { FastField, useFormikContext} from "formik"

const ParameterField = ({ label, name, ...props }) => {
  const { errors, touched, setFieldValue } = useFormikContext();
  console.log(`rendered ${name}`)
  return (
    <FormControl isInvalid={errors[name] && touched[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput
        onChange={(valueString, valueNumber) => {
          setFieldValue(name, valueNumber);
        }}
        min={0}
        clampValueOnBlur
        {...props}
      >
        <FastField id={name} name={name} as={NumberInputField} bg="white"/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}

export default ParameterField;