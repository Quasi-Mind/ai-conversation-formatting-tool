import { Stack, Heading,  Button, Checkbox } from "@chakra-ui/react"
import InputField from "./InputField/InputField"

const SubmitFields = () => {
  return (
    <Stack as="section" id="submit-field" spacing={3} mt={3}>
      <Heading as="h2">Submit</Heading>
      <InputField
        as={Checkbox}
        label="I have checked that there is no personally identifying information in this conversation."
        name="terms"
        borderColor="gray.400"
        size="lg"
      />
      <Button varient="solid" colorScheme="blue" id="submit" type="submit">Download formatted markdown (.md) file</Button>
    </Stack>
  )
}

export default SubmitFields