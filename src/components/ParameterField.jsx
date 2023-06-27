
import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
} from "@chakra-ui/react"
import { FastField, useFormikContext } from "formik"

const ParameterField = ({ label, name, ...props }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext();
  const hasName =  "has" + name.charAt(0).toUpperCase() + name.slice(1)
  
  console.log(`rendered ${name}`)
  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor={hasName}>
          <FastField 
          as={Checkbox}
          id={hasName}
          name={hasName}
          bg="white"
          size="lg"
          borderColor="gray.300"
        /> {label}</FormLabel>
      </FormControl>
      <FormControl hidden={!values[hasName]} isInvalid={errors[name] && touched[name]}>
        {/* <FormLabel htmlFor={name}>{label}</FormLabel> */}
        <NumberInput
          onChange={(valueString, valueNumber) => {
            setFieldValue(name, valueNumber);
          }}
          min={0}
          clampValueOnBlur
          {...props}
        >
          <FastField id={name} name={name} as={NumberInputField} bg="white" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Box>
  )
}

export default ParameterField;