import InputField from "./InputField"
import DatePicker from "react-datepicker"
import { useFormikContext } from "formik"
import { dumVersions, models } from "../config/appConfig"
import "react-datepicker/dist/react-datepicker.css";

const DetailsFields = () => {
  const { values, setFieldValue } = useFormikContext()

  return (
    <section id="details-fields">
      <h2>Details</h2>

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
    </section>
  )
}

export default DetailsFields