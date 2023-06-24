
const sanitizeTitle = (input) => {
  return input.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

function sanitizeDescription(input) {
  // Replace markdown specific characters and line breaks
  const step1 = input.replace(/(\||#|\*|_|-|\+|>|!|`|\n)/g, '\\$1');

  // Enclose in double quotes and escape any pre-existing unescaped double quotes
  const sanitizedInput = `"${step1.replace(/(?<!\\)"/g, '\\"')}"`;

  return sanitizedInput;
}

const markdownTempalte = formData => {


  const description = sanitizeDescription(formData.conversationDescription)

  const dateString = formData.conversationDate.toISOString().split('T')[0];

  const fileName = `${dateString.replaceAll('-', '')}-v${formData.dumVersion}-${formData.conversationModel}-${sanitizeTitle(formData.conversationTitle)}.md`

  let chatPairsMarkdown = '';
  formData.chatPairs.forEach((pair, index) => {
    chatPairsMarkdown += `\n\n#### Chat Pair ${index + 1}<a name="pair${index + 1}"></a>\n🧑‍💻 **user:**\n\n${pair.user}\n\n🤖 **model:**\n\n${pair.model}\n`
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
short_description: ${description}
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
**description:** ${description}

## Details

<details>
<summary>Click to expand</summary>

| Detail | Value |
| --- | --- |
| Formatter Version | ${formData.formatterVersion} |
| Conversation Title | ${formData.conversationTitle} |
| Short Description | ${formData.conversationDescription} |
| Date | ${dateString} |
| DUM Version | ${formData.dumVersion} |
| Modified Prompt | ${formData.isModified ? "Yes" : "No"} |
| System Message | ${formData.systemMessage ? "Yes" : "No"} |
| Model | ${formData.conversationModel} |
| Link | ${formData.conversationLink || "None provided"} |

</details>

## Parameters (if applicable)

<details>
<summary>Click to expand</summary>

${parametersTable}

</details>

## json
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
  return [template, fileName]
}

export default markdownTempalte;