import './App.scss'
import React, { useState } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';


const App = () => {

  function downloadMarkdown(markdown, filename) {
    // Create a Blob with the markdown
    const blob = new Blob([markdown], { type: 'text/markdown' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary download link
    const link = document.createElement('a');
    link.download = filename; // specify the file name
    link.href = url;

    // Append the link to the body (this is necessary for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  }

  const mdTempalte = formData => {
    const dateString = formData.conversationDate.toISOString().split('T')[0];
    
    const fileName = `${dateString.replaceAll('-','')}-${formData.dumVersion}-${formData.conversationModel}-${encodeURI(formData.conversationTitle)}.md`

    let chatPairsMarkdown = '';
    formData.chatPairs.forEach((pair, index) => {
      chatPairsMarkdown += `\n\n#### Chat Pair ${index + 1}<a name="pair${index + 1}"></a>}\n🧑‍💻 **user:**\n\n${pair.user}\n\n🤖 **model:**\n\n${pair.model}\n`
    });

    const parametersTable = `
| Parameter | Value |
| --- | --- |
| Max Tokens | ${formData.maxTokens} |
| Temperature | ${formData.temperature} |
| Top P | ${formData.topP} |
| Frequency Penalty | ${formData.frequencyPenalty} |
| Presence Penalty | ${formData.presencePenalty} |
  `
    const template = `---
formatter_version: ${formData.formatterVersion}
title: ${formData.conversationTitle}
short_description: ${formData.conversationDescription}
date: ${dateString}
DUM_version: ${formData.dumVersion}
modified_prompt: ${formData.isModified}
model: ${formData.ConversationModel}
parameters: 
  max_tokens: ${formData.maxTokens ? formData.maxTokens : null}
  temperature: ${formData.temperature ? formData.temperature : null}
  top_p: ${formData.topP ? formData.topP : null}
  frequency_penalty: ${formData.frequencyPenalty ? formData.frequencyPenalty : null}
  presence_penalty: ${formData.presencePenalty ? formData.presencePenalty : null}
link: ${formData.conversationLink}
---    

# Title: ${formData.conversationTitle}
**description:** ${formData.conversationDescription}

## Details

| Detail | Value |
| --- | --- |
| Conversation Title | ${formData.conversationTitle} |
| Short Description | ${formData.conversationDescription} |
| Date | ${dateString} |
| DUM Version | ${formData.dumVersion} |
| Modified Prompt | ${formData.isModified ? "Yes" : "No"} |
| System Message | ${formData.systemMessage ? "Yes" : "No"} |
| Model | ${formData.model} |
| Link | ${formData.conversationLink} || "None provided" |

## Parameters
${parametersTable}

## Raw json
<details>
<summary>Click to expand</summary>

\`\`\`json
${JSON.stringify(formData)}
\`\`\`
</details>

---

## Conversation

${chatPairsMarkdown}

`
    return [template,fileName]
  }



  const formatterVersion = "0.1.0"
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
    conversationLink: Yup.string()
      .nullable(),
    conversationTitle: Yup.string()
      .min(2, 'Too Short!')
      .max(120, 'Too Long!')
      .required('Required'),
    conversationDescription: Yup.string()
      .min(10, '10 characters minimum')
      .max(500, 'Too Long!')
      .required('Required'),
    conversationDate: Yup.date()
      .required('Required'),
    conversationModel: Yup.string()
      .required('Required'),

    temperature: Yup.number()
      .typeError('Must be a number')
      .test('is-nonNegative', 'cannot be negative', function (value) {
        return value === undefined || value >= 0;
      })
      .nullable(),
    maxTokens: Yup.number()
      .typeError('Must be a number')
      .integer('Must be an integer')
      .test('is-nonNegative', 'cannot be negative', function (value) {
        return value === undefined || value >= 0;
      })
      .nullable(),
    topP: Yup.number()
      .typeError('Must be a number')
      .test('is-nonNegative', 'cannot be negative', function (value) {
        return value === undefined || value >= 0;
      })
      .nullable(),
    frequencyPenalty: Yup.number()
      .typeError('Must be a number')
      .test('is-nonNegative', 'cannot be negative', function (value) {
        return value === undefined || value >= 0;
      })
      .nullable(),
    presencePenalty: Yup.number()
      .typeError('Must be a number')
      .test('is-nonNegative', 'cannot be negative', function (value) {
        return value === undefined || value >= 0;
      })
      .nullable(),

    dumVersion: Yup.string()
      .required('Required'),
    isModified: Yup.bool()
      .required('Required'),
    terms: Yup.bool()
      .isTrue('Please ensure there is no personally identifing information in the conversation')
      .required('Required'),
    systemMessage: Yup.bool()
      .required('Required'),
    chatPairs: Yup.array()
      .of(
        Yup.object().shape({
          user: Yup.string()
            .min(1, 'Cannot be empty')
            .required('Required'),
          model: Yup.string()
            .min(1, 'Cannot be empty')
            .required('Required'),
        })
      )
      .required('Must have chat pairs')
      .min(1, 'Minimum of one pair'),

  });
  const warn = (errors, touched, fieldName) => {
    return (
      errors[fieldName] && touched[fieldName] && <span className='warn-text'>{errors[fieldName]}</span>
    )
  }
  return (
    <div className='container'>
      <h1>Conversation Formatter v0.1.0</h1>
      <p>Welcome to the conversation formatter</p>
      <Formik
        initialValues={{
          formatterVersion: formatterVersion,
          conversationTitle: '',
          conversationDescription: '',
          conversationDate: startDate,
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

        }}
        validationSchema={ConversationSchema}
        onSubmit={async (values) => {
          console.log(values)
          console.log(...mdTempalte(values))
          downloadMarkdown(...mdTempalte(values))
          // await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <label htmlFor="conversationLink">Link to Conversation</label>
            <Field id="conversationLink" name="conversationLink" placeholder="Conversation chat link (if one exists)" />

            <label htmlFor="conversationTitle">Conversation Title<span className='warn-text'> *</span></label>
            <Field id="conversationTitle" name="conversationTitle" placeholder="Enter a short descriptive title (max 120 characters)" />
            {warn(errors, touched, 'conversationTitle')}

            <label htmlFor="conversationDescription">Conversation Description<span className='warn-text'> *</span></label>
            <Field
              id="conversationDescription"
              name="conversationDescription"
              placeholder="Brief summary of the conversation (max 500 characters)"
              component="textarea"
            />
            {warn(errors, touched, 'conversationDescription')}

            <label htmlFor='conversationDate'>Date of Conversation<span className='warn-text'> *</span></label>
            < Field
              component={DatePicker}
              id='conversationDate'
              name='conversationDate'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            {warn(errors, touched, 'conversationDate')}


            <label htmlFor="dumVersion">Which DUM version did you use?<span className='warn-text'> *</span></label>
            <Field
              component="select"
              id="dumVersion"
              name="dumVersion"
            >
              {dumVersions.map((version, i) => <option key={i} value={version.toLowerCase()}>{version}</option>)}
            </Field>
            {warn(errors, touched, 'dumVersion')}

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
            {warn(errors, touched, 'conversationModel')}

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
                    <ErrorMessage name={`temperature`} component="span" className="warn-text" />
                    <Field type="number" id="temperature" name="temperature" step="any" min="0" />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="maxTokens">Maximum tokens</label>
                  <div>
                    <ErrorMessage name={`maxTokens`} component="span" className="warn-text" />
                    <Field type="number" id="maxTokens" name="maxTokens" min="0" />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="topP">Top P</label>
                  <div>
                    <ErrorMessage name={`topP`} component="span" className="warn-text" />
                    <Field type="number" id="topP" name="topP" step="any" min="0" />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="frequencyPenalty">Frequency penalty</label>
                  <div>
                    <ErrorMessage name={`frequencyPenalty`} component="span" className="warn-text" />
                    <Field type="number" id="frequencyPenalty" name="frequencyPenalty" step="any" min="0" />
                    <button type="button" onClick={() => setFieldValue("temperature", '')}>Clear</button>
                  </div>

                  <label htmlFor="presencePenalty">Presence penalty</label>
                  <div>
                    <ErrorMessage name={`presencePenalty`} component="span" className="warn-text" />
                    <Field type="number" id="presencePenalty" name="presencePenalty" step="any" min="0" />
                    <button type="button" onClick={() => setFieldValue("temperature", null)}>Clear</button>
                  </div>
                </div>
              </>
            )}


            <label>
              <Field type="checkbox" id="terms" name="terms" /> I have checked that there is no personally identifying information in this conversation.<span className='warn-text'> *</span>
            </label>
            {errors['terms'] && <span className='warn-text'>{errors['terms']}</span>}
            <button id="submit" type="submit">Download formatted markdown (.md) file</button>

            <hr />
            <h2>Add Conversation</h2>
            <p>copy and past your inputs and the models outputs <span className='hint'> (please also include the initial prompt and response)</span></p>

            <label>
              <Field type="checkbox" id="systemMessage" name="systemMessage" />
              Did you use DUM as a system message? <span className='hint'> * leave unchecked if unsure</span>
            </label>

            {!values.chatPairs[0] && errors.chatPairs && <span className='warn-text'>{errors.chatPairs}</span>}

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