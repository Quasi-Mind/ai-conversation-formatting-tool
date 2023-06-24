import React from 'react';
import { useFormikContext } from 'formik';
import InputField from './InputField';

const ParameterFields = () => {
  const { values } = useFormikContext();

  return (
    <section id="parameter-fields" className="params">
      <h2>Parameters</h2>
      <InputField 
        label="Did you modify the parameters(eg. temp, sampling)?" 
        name="showParams" 
        type="checkbox" 
      />

      {values.showParams && (
      <>
        <p>Select all that apply</p>

          <InputField
            label="Temperature"
            name="temperature"
            type="number"
            step="any"
            min="0"
            clear
          />

          <InputField
            label="Maimum Tokens"
            name="maxTokens"
            type="number"
            min="0"
            clear
          />

          <InputField
            label="Top P"
            name="topP"
            type="number"
            step="any"
            min="0"
            clear
          />

          <InputField
            label="Frequency penalty"
            name="frequencyPenalty"
            type="number"
            step="any"
            min="0"
            clear
          />

          <InputField
            label="Presence penalty"
            name="presencePenalty"
            type="number"
            step="any"
            min="0"
            clear
          />
      </>
      )}
    </section>
  )
}

export default ParameterFields;