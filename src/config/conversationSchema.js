import * as Yup from 'yup';

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

export default ConversationSchema;