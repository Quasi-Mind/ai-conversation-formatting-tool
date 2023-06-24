import { ErrorMessage, FieldArray, useFormikContext } from "formik"
import InputField from "./InputField"

const ConversationFields = () => {
  const { values } = useFormikContext()
  return (
    <section>
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
    </section>
  )
}

export default ConversationFields