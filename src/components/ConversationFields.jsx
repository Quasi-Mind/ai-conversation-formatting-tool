import { ErrorMessage, FastField, FieldArray, useFormikContext } from "formik"
import InputField from "./InputField/InputField"
import {
  FormControl,
  Stack,
  Textarea,
  Heading,
  Text,
  Button,
  FormErrorMessage,
  Box,
  HStack,
  Divider,
  FormLabel,
  Checkbox
} from "@chakra-ui/react"

const ConversationFields = () => {
  const { errors, touched, values } = useFormikContext()
  return (
    <Stack as="section" id="conversation-fields" spacing={3} mt={3}  >
      <Heading  as="h2">Add Conversation</Heading>
      <Stack spacing={3} p={3} bg="gray.100" shadow="sm" borderColor="gray.300" borderWidth={1} borderStyle="solid" borderRadius={4}>


        <Text>copy and paste your inputs and the models outputs <span className='hint'> (please also include the initial prompt and response)</span></Text>

        <InputField
          as={Checkbox}
          label="Did you use DUM as a system message?"
          name="systemMessage"
          size="lg"
          borderColor="gray.400"
        />

        <Divider mt={5} borderColor="gray.300" />

        <FieldArray name="chatPairs">
          {({ insert, remove, push }) => (
            <>
              <Box className="conversation-container">
                {values.chatPairs.length > 0 ? (

                  values.chatPairs.map((chatPair, index) => (
                    <>
                      <Stack spacing={3} className='conversation-pair' key={index}>
                        <Stack spacing={3} w="100%" className="row user" key={index}>
                          <FormControl
                            isInvalid={(errors.chatPairs?.[index]?.user && touched.chatPairs?.[index]?.user)}
                          >
                            <HStack spacing={3}>
                              <FormLabel mt={1} mb="auto" display="flex" justifyContent="center" alignItems="center" color="white" borderRadius={4} w="60px" h="60px" bg="gray.500" htmlFor={`chatPairs.${index}.user`}>User</FormLabel>
                              <Box w="100%">
                                <FastField
                                  bg="white"
                                  isInvalid={(errors.chatPairs?.[index]?.user && touched.chatPairs?.[index]?.user)}
                                  as={Textarea} label="user" name={`chatPairs.${index}.user`} placeholder="Enter user Message" />
                                <ErrorMessage name={`chatPairs.${index}.user`} component={FormErrorMessage} />
                              </Box>
                            </HStack>
                          </FormControl>
                          <FormControl
                            isInvalid={(errors.chatPairs?.[index]?.model && touched.chatPairs?.[index]?.model)}
                          >
                            <HStack spacing={3}>
                              <FormLabel mt={1} mb="auto" display="flex" justifyContent="center" alignItems="center" color="white" borderRadius={4} w="60px" h="60px" bg="green.500" htmlFor={`chatPairs.${index}.model`}>Model</FormLabel>
                              <Box w="100%">
                                <FastField
                                  bg="white"
                                  isInvalid={(errors.chatPairs?.[index]?.model && touched.chatPairs?.[index]?.model)}
                                  as={Textarea} label="model" name={`chatPairs.${index}.model`} placeholder="Enter model Message" />
                                <ErrorMessage name={`chatPairs.${index}.model`} component={FormErrorMessage} />
                              </Box>
                            </HStack>
                          </FormControl>
                        </Stack>
                        <Button
                          ml="auto"
                          colorScheme="red"
                          size="xs"
                          variant='outline'
                          className="remove-pair"
                          onClick={() => remove(index)}
                        >
                          Remove Chat Pair
                        </Button>
                      </Stack>
                      <Divider borderColor="gray.300" my={5} />
                    </>
                  ))) : (
                  <FormControl isInvalid={errors.chatPairs}>
                    <FormErrorMessage><Text mx="auto">{errors.chatPairs}</Text></FormErrorMessage>
                  </FormControl>
                )}
              </Box>
              <Button
                mx="auto"
                colorScheme="teal"
                className="add-pair"
                onClick={() => push({ user: '', model: '' })}
              >
                Add another message pair
              </Button>
            </>
          )}
        </FieldArray>
      </Stack >
    </Stack>
  )
}

export default ConversationFields