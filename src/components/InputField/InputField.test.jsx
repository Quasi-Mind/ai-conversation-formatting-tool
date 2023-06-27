import { render, fireEvent } from '@testing-library/react';
import FormatterForm from '../FormatterForm';
import { act } from 'react-dom/test-utils';

const fields = [
  {
    testId:'conversationTitle',
    testValue: 'Test value'
  },
  {
    testId:'conversationDescription',
    testValue: 'Test value'
  },
  {
    testId:'testField',
    testValue: 'Test value'
  }
]


describe('Check re-render of FastField components', () => {
  let logMock;

  // Setup before each test
  beforeEach(() => {
    // Mock the console.log function
    logMock = jest.spyOn(console, 'log');
  });

  // Cleanup after each test
  afterEach(() => {
    logMock.mockRestore();
  });

  fields.forEach(field => {
    test(`only ${field.testId} re-renders`, () => {
      // Render the form
      const { getByTestId } = render(<FormatterForm />);

      // Find the FastField that should re-render
      const fastField = getByTestId(field.testId);

      // Change the state of the FastField
      act(() => {
        fireEvent.change(fastField, { target: { value: field.testValue } });
      });

      // count the number of times 'rendered InputField:' was logged
      const inputFieldRenderCount = logMock.mock.calls.filter(([arg]) => arg.includes('rendered InputField:')).length;

      // This should be 1, since only the FastField should re-render
      expect(inputFieldRenderCount).toBe(1);  
    });
  });
});