// InputField.jsx
import React from 'react';
import { ErrorMessage, FastField, useFormikContext} from 'formik';
import { FormLabel, FormErrorMessage, FormControl } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const InputField = ({ label, name, clear, isInvalid, isRequired, ...props }) => {
  const { errors, touched  } = useFormikContext();
  return (
    <FormControl {...{isRequired}} isInvalid={Boolean(errors[name] && touched[name])}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FastField
        bg="white"
        // borderColor="gray.300"
        id={name}
        name={name}
        data-testid={name}
        {...props}
      />
      <ErrorMessage name={name} component={FormErrorMessage} />
    </FormControl>
  )
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clear: PropTypes.bool,
};

export default InputField;
