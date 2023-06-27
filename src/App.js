// import './App.scss'
import React from 'react';
import { ChakraProvider, Heading, Text, Stack, Container, Box } from '@chakra-ui/react'
import { formatterVersion } from './config/appConfig';
import FormatterForm from './components/FormatterForm';

const App = () => {
  return (
    <ChakraProvider>
      <Container p={0} maxW="container.md" >
        <Stack spacing={3}>
          <Box mx={{ sm: 3, md: 0 }}>
            <Heading as="h1" size="4xl">Conversation Formatter v{formatterVersion}</Heading>
            <Text size="1xl">Welcome to the conversation formatter</Text>
          </Box>
          <Box p={3} bg="gray.50" borderWidth={1} borderColor="gray.300" borderRadius={{ md: 4 }} shadow="md">
            <FormatterForm />
          </Box>
        </Stack>
      </Container>
    </ChakraProvider>
  )
};

export default App;