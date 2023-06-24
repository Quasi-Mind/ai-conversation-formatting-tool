import { Formik, Form } from 'formik'
import { formatterVersion, dumVersions, models } from '../config/appConfig'
import ConversationSchema from '../config/conversationSchema'
import downloadMarkdown from '../utils/downloadMarkdown'
import markdownTempalte from '../utils/markdownTemplate'
import DetailsFields from './DetailsFields'
import ParameterFields from './ParameterFields'
import SubmitFields from './SubmitFields'
import ConversationFields from './ConversationFields'

export const FormatterForm = () => {
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
    <Formik
      initialValues={initialValues}
      validationSchema={ConversationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <DetailsFields />
        <ParameterFields />
        <SubmitFields />
        <ConversationFields />
      </Form>
    </Formik>
  )
}
