import './App.scss'
import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
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
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <label htmlFor="conversationLink">Link to Conversation</label>
            <Field
              id="conversationLink"
              name="conversationLink"
              placeholder="Conversation chat link (if one exists)"
            />

            <label htmlFor="conversationTitle">Conversation Title<span className='warn-text'> *</span></label>
            <Field
              id="conversationTitle"
              name="conversationTitle"
              placeholder="Enter a short descriptive title (max 120 characters)"
            />
            <ErrorMessage
              name="conversationTitle"
              component="span"
              className="warn-text"
            />

            <label htmlFor="conversationDescription">Conversation Description<span className='warn-text'> *</span></label>
            <Field
              id="conversationDescription"
              name="conversationDescription"
              placeholder="Brief summary of the conversation (max 500 characters)"
            />
            <ErrorMessage
              name="conversationDescription"
              component="span"
              className="warn-text"
            />

            <label htmlFor='conversationDate'>Date of Conversation<span className='warn-text'> *</span></label>
            < Field
              component={DatePicker}
              id='conversationDate'
              name='conversationDate'
              selected={values.conversationDate}
              onChange={(date) => setFieldValue('conversationDate', date)}
            />
            <ErrorMessage
              name="conversationDate"
              component="span"
              className="warn-text"
            />

            <label htmlFor="dumVersion">Which DUM version did you use?<span className='warn-text'> *</span></label>
            <Field
              component="select"
              id="dumVersion"
              name="dumVersion"
            >
              {dumVersions.map((version, i) => <option key={i} value={version.toLowerCase()}>v{version}</option>)}
            </Field>
            <ErrorMessage
              name="dumVersion"
              component="span"
              className="warn-text"
            />

            <label>
              <Field type="checkbox" id="isModified" name="isModified" />
              Did you modify this version of the prompt(eg. testing, experiementing)?
            </label>

            <label htmlFor="conversationModel">Which model did you use?<span className='warn-text'> *</span></label>
            <Field
              component="select"
              id="conversationModel"
              name="conversationModel"
            >
              {models.map((model, i) => <option key={i} value={model.toLowerCase()}>{model}</option>)}
            </Field>
            <ErrorMessage
              name="conversationModel"
              component="span"
              className="warn-text"
            />

            <label>
              <Field type="checkbox" id="showParams" name="showParams" />
              Did you modifiy the parameters(eg. temp, sampling)? <span className='hint'> * leave unchecked if unsure</span>
            </label>

            {values.showParams && (
              <>
                <p>Select all that apply</p>
                <div className="params">
                  <label htmlFor="temperature">Temperature</label>
                  <div>
                    <ErrorMessage
                      name={`temperature`}
                      component="span"
                      className="warn-text"
                    />
                    <Field
                      type="number"
                      id="temperature"
                      name="temperature"
                      step="any"
                      min="0"
                    />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="maxTokens">Maximum tokens</label>
                  <div>
                    <ErrorMessage
                      name={`maxTokens`}
                      component="span"
                      className="warn-text"
                    />
                    <Field
                      type="number"
                      id="maxTokens"
                      name="maxTokens"
                      min="0"
                    />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="topP">Top P</label>
                  <div>
                    <ErrorMessage
                      name="topP"
                      component="span"
                      className="warn-text"
                    />
                    <Field
                      type="number"
                      id="topP"
                      name="topP"
                      step="any"
                      min="0"
                    />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="frequencyPenalty">Frequency penalty</label>
                  <div>
                    <ErrorMessage
                      name="frequencyPenalty"
                      component="span"
                      className="warn-text"
                    />
                    <Field
                      type="number"
                      id="frequencyPenalty"
                      name="frequencyPenalty"
                      step="any"
                      min="0"
                    />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="presencePenalty">Presence penalty</label>
                  <div>
                    <ErrorMessage
                      name="presencePenalty"
                      component="span"
                      className="warn-text"
                    />
                    <Field
                      type="number"
                      id="presencePenalty"
                      name="presencePenalty"
                      step="any"
                      min="0"
                    />
                    <button type="button" onClick={() => setFieldValue("temperature", null)}>Clear</button>
                  </div>
                </div>
              </>
            )}

            <label>
              <Field
                type="checkbox"
                id="terms"
                name="terms"
              />
              I have checked that there is no personally identifying information in this conversation.<span className='warn-text'> *</span>
            </label>
            <ErrorMessage
              name="terms"
              component="span"
              className="warn-text"
            />
            <button id="submit" type="submit">Download formatted markdown (.md) file</button>

            <hr />
            <h2>Add Conversation</h2>
            <p>copy and paste your inputs and the models outputs <span className='hint'> (please also include the initial prompt and response)</span></p>

            <label>
              <Field
                type="checkbox"
                id="systemMessage"
                name="systemMessage"
              />
              Did you use DUM as a system message? <span className='hint'> * leave unchecked if unsure</span>
            </label>
            <ErrorMessage
              name="systemMessage"
              component="span"
              className="warn-text"
            />

            <FieldArray name="chatPairs">
              {({ insert, remove, push }) => (
                <div className="conversation-container">
                  {values.chatPairs.length > 0 &&
                    values.chatPairs.map((chatPair, index) => (
                      <div className='conversation-pair' key={index}>
                        <button
                          type="button"
                          className="remove-pair"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
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
                              className="warn-text"
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
                              className="warn-text"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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