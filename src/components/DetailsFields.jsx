import InputField from "./InputField/InputField"
import DatePicker from "react-datepicker"
import { FastField, useFormikContext } from "formik"
import { dumVersions, models } from "../config/appConfig"
import {
  Checkbox,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react"
import "react-datepicker/dist/react-datepicker.css";

const DetailsFields = () => {
  const { values, setFieldValue } = useFormikContext()

  return (
    <Stack as="section" id="details-fields" spacing={5} mt={2}>
      <Heading as="h2">Details</Heading>

      <InputField
        as={Input}
        label="Link to Conversation"
        name="conversationLink"
        placeholder="Conversation chat link (if one exists)"
      />

      <InputField
        as={Input}
        label="Conversation Title"
        name="conversationTitle"
        placeholder="Enter a short descriptive title (max 120 characters)"
      />

      <InputField
        as={Input}
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
        as={Select}
      >
        {dumVersions.map((version, i) => <option key={i} value={version.toLowerCase()}>v{version}</option>)}
      </InputField>

      <InputField
        as={Checkbox}
        size="lg"
        borderColor="gray.400"
        
        label="Did you modify this version of the prompt(eg. testing, experiementing)?"
        name="isModified"
        type="checkbox"
      />

      <InputField
        label="Conversation Model"
        name="conversationModel"
        as={Select}
      >
        {models.map((model, i) => <option key={i} value={model.toLowerCase()}>{model}</option>)}
      </InputField>
    </Stack>
  )
}

export default DetailsFields