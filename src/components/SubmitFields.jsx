import { Stack, Heading, Button, Checkbox, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import { FastField, useFormikContext } from "formik"

const SubmitFields = () => {
  const { errors } = useFormikContext();
  return (
    <Stack as="section" id="submit-fields" spacing={3} mt={3}>
      <Heading borderBottomColor="gray.300" borderBottomSize={1} as="h2">Submit</Heading>
      <Stack spacing={3} p={3} bg="gray.100" shadow="sm" borderColor="gray.300" borderWidth={1} borderStyle="solid" borderRadius={4}>
        <FormControl isRequired
          isInvalid={errors.terms}>
          <FormLabel><FastField
            as={Checkbox}
            bg="white"
            name="terms"
            borderColor="gray.400"
            size="lg"
          /> I have checked that there is no personally identifying information in this conversation.</FormLabel>
          {errors.terms && <FormErrorMessage>{errors.terms}</FormErrorMessage>}
        </FormControl>
        <Button varient="solid" colorScheme="blue" id="submit" type="submit">Download formatted markdown (.md) file</Button>
      </Stack>
    </Stack>
  )
}

export default SubmitFields