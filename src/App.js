import './App.scss'
import React, { useState } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';


const fieldPair = (i) => {
  return (
    <>
    <label htmlFor={`user${i}`}/>
    <Field/>

    <label htmlFor={`model${i}`}/>
    <Field/>
</>
  )
}

const App = () => {
  const dumVersions = [
    "v1.0.0"
  ]

  const models = [
    "chatgpt-4",
    "chatgpt-3.5-turbo",
    "gpt-4",
    "gpt-4-0613",
    "gpt-4-32k",
    "gpt-4-32k-0613",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k-0613",
    "text-davinci-003",
    "text-davinci-002",
    "code-davinci-002",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
    "davinci",
    "curie",
    "babbage",
    "ada",
  ]
  
  const [startDate, setStartDate] = useState(new Date());
  const ConversationSchema = Yup.object().shape({
    conversationTitle: Yup.string()
      .min(2, 'Too Short!')
      .max(80, 'Too Long!')
      .required('Required'),
    conversationDescription: Yup.string()
      .min(2, 'Too Short!')
      .max(300, 'Too Long!')
      .required('Required'),
    conversationDate: Yup.date()
      .required('Required'),
    conversationModel: Yup.string()
      .required('Required'),
    dumVersion: Yup.string()
      .required('Required'),
    isModified: Yup.bool()
      .required('Required'),
  });
  const warn = (errors, touched, fieldName) => {
    return (
      errors[fieldName] && touched[fieldName] && <span className='warn-text'>{errors[fieldName]}</span>
    )
  }
  return (
    <div className='container'>
      <h1>Conversation Formatter</h1>
      <p>Welcome to the conversation formatter</p>
      <Formik
        initialValues={{
          conversationTitle: '',
          conversationDescription: '',
          conversationDate: startDate,
          dumVersion: dumVersions[0],
          isModified: false,
          conversationModel: models[0],
          chatPairs: [{ user: '', model: '' }],

      }}
        validationSchema={ConversationSchema}
        onSubmit={async (values) => {
          console.log(values)
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <label htmlFor="conversationTitle">Conversation Title</label>
            
            <Field id="conversationTitle" name="conversationTitle" placeholder="Enter a short descriptive title (max 80 characters)" />
            {warn(errors,touched,'conversationTitle')}

            <label htmlFor="conversationDescription">Conversation Description</label>
            <Field
              id="conversationDescription"
              name="conversationDescription"
              placeholder="Write a description of the conversation. (max 300 characters)"
              component="textarea"
            />
            {warn(errors,touched,'conversationDescription')}

            <label htmlFor='conversationDate'>Date of Conversation</label>
            < Field 
              component={DatePicker}
              id='conversationDate'
              name='conversationDate'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            {warn(errors,touched,'conversationDate')}


            <label htmlFor="dumVersion">Which DUM version did you use?</label>
            <Field
              component="select"
              id="dumVersion"
              name="dumVersion"
            >
              {dumVersions.map((version,i) => <option key={i} value={version.toLowerCase()}>{version}</option>)}
            </Field>
            {warn(errors,touched,'dumVersion')}

            <label>
              <Field type="checkbox" id="isModified" name="isModified" />
              Did you modify this version of the prompt(eg. testing, experiementing)?
            </label>

            <label htmlFor="conversationModel">Which model did you use?</label>
            <Field
              component="select"
              id="conversationModel"
              name="conversationModel"
            >
              {models.map((model, i) => <option key={i} value={model.toLowerCase()}>{model}</option>)}
            </Field>
            {warn(errors,touched,'conversationModel')}

            <span ></span>

            <label>
              <Field type="checkbox" id="terms" name="terms" /> I have checked that there is no personally identifying information in this conversation.
            </label>
            <button type="submit">Submit</button>

            <hr/>
            <h2>Add Conversation</h2>
            <p>copy and past your inputs and the models outputs</p>

            <FieldArray name="chatPairs">
              {({ insert, remove, push }) => (
                <div>
                  {values.chatPairs.length > 0 &&
                    values.chatPairs.map((chatPair, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label className='user' htmlFor={`chatPairs.${index}.user`}>User</label>
                          <Field
                            name={`chatPairs.${index}.user`}
                            placeholder="Enter User Message"
                            component="textarea"
                          />
                          <ErrorMessage
                            name={`chatPairs.${index}.user`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label className='model' htmlFor={`chatPairs.${index}.model`}>Model</label>
                          <Field
                            name={`chatPairs.${index}.model`}
                            placeholder="Enter Model Response"
                            component="textarea"
                          />
                          <ErrorMessage
                            name={`chatPairs.${index}.model`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ user: '', model: '' })}
                  >
                    Add another message pair
                  </button>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default App;