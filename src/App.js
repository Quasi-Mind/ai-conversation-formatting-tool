// import './App.scss'
import React from 'react';
import { ChakraProvider, Heading, Text, Stack, Container, Box } from '@chakra-ui/react'
import { formatterVersion } from './config/appConfig';
import FormatterForm from './components/FormatterForm';

const App = () => {
  return (
    <ChakraProvider>
        <Container maxW="container.md" >
          <Stack spacing={3}>
            <Heading as="h1" size="4xl">Conversation Formatter v{formatterVersion}</Heading>
            <Text size="1xl">Welcome to the conversation formatter</Text>
            <Box p={3} bg="gray.100" borderWidth={1} borderColor="gray.300" borderRadius={4} shadow="md">
              <FormatterForm />
            </Box>
          </Stack>
        </Container>
    </ChakraProvider>
  )
};

export default App;