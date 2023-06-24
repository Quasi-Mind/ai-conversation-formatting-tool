import InputField from "./InputField"

const SubmitFields = () => {
  return (
    <section id="submit-field">
      <h2>Submit</h2>
      <InputField
        label="I have checked that there is no personally identifying information in this conversation."
        name="terms"
        type="checkbox"
      />
      <button id="submit" type="submit">Download formatted markdown (.md) file</button>
    </section>
  )
}

export default SubmitFields