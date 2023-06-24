import './App.scss'
import React from 'react';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import InputField from './components/InputField';
import { formatterVersion, dumVersions, models } from './config/appconfig';
import DatePicker from "react-datepicker"
import ConversationSchema from './config/conversationSchema';
import markdownTempalte from './utils/markdownTemplate';
import downloadMarkdown from './utils/downloadMarkdown';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {

  const initialValues = {
    formatterVersion: formatterVersion,
    conversationTitle: '',
    conversationDescription: '',
    conversationDate: new Date(),
    conversationLink: '',
    dumVersion: dumVersions[0],
    isModified: false,
    conversationModel: models[0],
    showParams: false,
    temperature: '',
    maxTokens: '',
    topP: '',
    frequencyPenalty: '',
    presencePenalty: '',
    systemMessage: false,
    chatPairs: [{ user: '', model: '' }],
  }

  const handleSubmit = (values) => {
    return downloadMarkdown(...markdownTempalte(values))
  }

  return (
    <div className='container'>
      <h1>Conversation Formatter v{formatterVersion}</h1>
      <p>Welcome to the conversation formatter</p>
      <Formik
        initialValues={initialValues}
        validationSchema={ConversationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <InputField
              label="Link to Conversation"
              name="conversationLink"
              placeholder="Conversation chat link (if one exists)"
            />

            <InputField
              label="Conversation Title"
              name="conversationTitle"
              placeholder="Enter a short descriptive title (max 120 characters)"
            />

            <InputField
              label="Conversation Description"
              name="conversationDescription"
              placeholder="Brief summary of the conversation (max 500 characters)"
            />

            <InputField
              label="Date of Conversation"
              name="conversationDate"
              component={DatePicker}
              selected={values.conversationDate}
              onChange={(date) => setFieldValue('conversationDate', date)}
            />

            <InputField
              label="DUM Version"
              name="dumVersion"
              component="select"
            >
              {dumVersions.map((version, i) => <option key={i} value={version.toLowerCase()}>v{version}</option>)}
            </InputField>

            <InputField
              label="Did you modify this version of the prompt(eg. testing, experiementing)?"
              name="isModified"
              type="checkbox"
            />

            <InputField
              label="Conversation Model"
              name="conversationModel"
              component="select"
            >
              {models.map((model, i) => <option key={i} value={model.toLowerCase()}>{model}</option>)}
            </InputField>

            <InputField label="Did you modify the parameters(eg. temp, sampling)?" name="showParams" type="checkbox" />


            {values.showParams && (
              <>
                <p>Select all that apply</p>
                <div className="params">

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

                </div>
              </>
            )}

            <InputField
              label="I have checked that there is no personally identifying information in this conversation."
              name="terms"
              type="checkbox"
            />
            <button id="submit" type="submit">Download formatted markdown (.md) file</button>

            <hr />
            <h2>Add Conversation</h2>
            <p>copy and paste your inputs and the models outputs <span className='hint'> (please also include the initial prompt and response)</span></p>

            <InputField
              label="Did you use DUM as a system message?"
              name="systemMessage"
              type="checkbox"
            />

            <FieldArray name="chatPairs">
              {({ insert, remove, push }) => (
                <div className="conversation-container">
                  {values.chatPairs.length > 0 ? (

                    values.chatPairs.map((chatPair, index) => (
                      <div className='conversation-pair' key={index}>
                        <button
                          type="button"
                          className="remove-pair"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                        <div className="row user" key={index}>
                          <div className="col">
                            <InputField
                              label="User"
                              name={`chatPairs.${index}.user`}
                              placeholder="Enter User Message"
                              component="textarea"
                            />
                          </div>
                          <div className="col model">
                            <InputField
                              label="Model"
                              name={`chatPairs.${index}.model`}
                              placeholder="Enter Model Response"
                              component="textarea"
                            />
                          </div>
                        </div>
                      </div>
                    ))) : (
                    <ErrorMessage name="chatPairs" component="span" className="warn-text" />
                    )}
                  <button
                    type="button"
                    className="add-pair"
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