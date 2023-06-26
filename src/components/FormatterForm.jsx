import { Formik, Form } from 'formik'
import { formatterVersion, dumVersions, models } from '../config/appConfig'
import ConversationSchema from '../config/conversationSchema'
import downloadMarkdown from '../utils/downloadMarkdown'
import markdownTempalte from '../utils/markdownTemplate'
import DetailsFields from './DetailsFields'
import ParameterFields from './ParameterFields'
import SubmitFields from './SubmitFields'
import ConversationFields from './ConversationFields'

const FormatterForm = () => {
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
    hasTemperature: false,
    temperature: 1,
    hasMaxTokens: false,
    maxTokens: 256,
    hasTopP: false,
    topP: 1,
    hasFrequencyPenalty: false,
    frequencyPenalty: 0,
    hasPresencePenalty: false,
    presencePenalty: 0,
    systemMessage: false,
    chatPairs: [{ user: '', model: '' }],
    term: false
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
      <Form >
        <DetailsFields />
        <ParameterFields />
        <ConversationFields />
        <SubmitFields />
      </Form>
    </Formik>
  )
}

export default FormatterForm