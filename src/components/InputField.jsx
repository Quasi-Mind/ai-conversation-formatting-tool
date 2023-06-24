// InputField.jsx
import React from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const InputField = ({ label, name, clear, ...props }) => {
  const { initialValues, setFieldValue } = useFormikContext();

  const handleClear = () => {
    setFieldValue(name, initialValues[name]);
  };
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...props} />
      <ErrorMessage
        name={name}
        component="span"
        className="warn-text"
      />
      {clear && <button type="button" onClick={handleClear}>Clear</button>}
    </>
  )
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clear: PropTypes.array,
};

export default InputField;
