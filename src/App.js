import './App.scss'
import React from 'react';
import { formatterVersion } from './config/appConfig';
import { FormatterForm } from './components/FormatterForm';

const App = () => {
  return (
    <div className='container'>
      <h1>Conversation Formatter v{formatterVersion}</h1>
      <p>Welcome to the conversation formatter</p>
      <FormatterForm />
    </div>
  )
};

export default App;