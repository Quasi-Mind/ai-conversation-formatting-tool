
const sanitizeTitle = (input) => {
  return input.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

function sanitizeInputText(input) {

  /*
  Replace markdown specific characters (except hyphens in words) and line breaks

  This line of code is responsible for sanitizing the user-provided input to ensure that it doesn't break the markdown formatting.
  
  Here's what each part of the regular expression accomplishes:
  
  - \\\|: Escapes any pipe characters (|). In Markdown, these can be used to create tables.
  - #: Escapes any hash signs (#). In Markdown, these are used for headings.
  - \\\*: Escapes any asterisks (*). In Markdown, these can be used for emphasis (e.g., bold or italic text).
  - _: Escapes any underscores (_). Like asterisks, these can also be used for emphasis in Markdown.
  - (-(?!\w)): Escapes any hyphens (-) that are not directly followed by a word character. In Markdown, hyphens can be used for lists or strikethrough text. The negative lookahead (?!\w) ensures that hyphens within words (e.g., hyphenated words) are not escaped, as they don't carry special Markdown significance.
  - \\\+: Escapes any plus signs (+). In Markdown, these can also be used for lists.
  - >: Escapes any greater-than signs (>). In Markdown, these are used for blockquotes.
  - !: Escapes any exclamation marks (!). In Markdown, these are used for images.
  - `: Escapes any back-ticks (`). In Markdown, these are used for inline code.
  - \n: Escapes any line breaks. 
  
  The replace function uses the global (g) flag, meaning it replaces all occurrences, not just the first one.
  */
  const step1 = input.replace(/(\||#|\*|_|(-(?!\w))|\+|>|!|`|\n)/g, '\\$1');

  /*
  Enclose in double quotes and escape any pre-existing unescaped double quotes

  Enclosing the sanitized strings in double quotes ensures that they're interpreted as literal strings, not as some other data type. This is particularly important in contexts like YAML (used in our markdown frontmatter) or markdown itself.
  
  For YAML (ie. frontmatter):
    - Without quotes, certain strings like "yes", "no", "true", or "false" would be interpreted as Boolean values.
    - Special characters or sequences (like ":") could lead to misinterpretation as these are key-value pair delimiters in YAML.
  
  For Markdown:
    - Certain characters have special markdown syntax implications. Enclosing in quotes ensures these are treated as literal characters, not markdown syntax.
  
  Escaping any pre-existing unescaped double quotes within the string prevents the enclosing quotes from being prematurely closed. Hence, it's necessary for proper string interpretation.
  */
  const sanitizedInput = `"${step1.replace(/(?<!\\)"/g, '\\"')}"`;

  return sanitizedInput;
}

function sanitizeYaml(input) {
  // Always enclose in double quotes and escape any pre-existing unescaped double quotes
  return `"${input.replace(/(?<!\\)"/g, '\\"')}"`;
}

const markdownTemplate = formData => {

  const titleMarkdown = sanitizeInputText(formData.conversationTitle)
  const descriptionMarkdown = sanitizeInputText(formData.conversationDescription)
  let linkMarkdown = formData.conversationLink 
    ? `[${formData.conversationLink}](${formData.conversationLink})` 
    : "None provided";

  const dateString = formData.conversationDate.toISOString().split('T')[0];


   const titleYaml = sanitizeYaml(formData.conversationTitle)
   const descriptionYaml = sanitizeYaml(formData.conversationDescription)
   const modelYaml = sanitizeYaml(formData.conversationModel)

  const fileName = `${dateString.replaceAll('-', '')}-v${formData.dumVersion}-${formData.conversationModel}-${sanitizeTitle(formData.conversationTitle)}.md`

  let chatPairsMarkdown = '';
  formData.chatPairs.forEach((pair, index) => {
    chatPairsMarkdown += `\n\n#### Chat Pair ${index + 1}<a name="pair${index + 1}"></a>\n🧑‍💻 **user:**\n\n${pair.user}\n\n🤖 **model:**\n\n${pair.model}\n`
  });

  const parametersTable = `
| Parameter | Value |
| --- | --- |
| Max Tokens | ${formData.hasMaxTokens ? formData.maxTokens : "N/A"} |
| Temperature | ${formData.hasTemperature ? formData.temperature : "N/A"} |
| Top P | ${formData.hasTopP ? formData.topP : "N/A"} |
| Frequency Penalty | ${formData.hasFrequencyPenalty ? formData.frequencyPenalty : "N/A"} |
| Presence Penalty | ${formData.hasPresencePenalty ? formData.presencePenalty : "N/A"} |
  `
  const template = `---
formatter_version: ${formData.formatterVersion}
title: ${titleYaml}
short_description: ${descriptionYaml}  
date: ${dateString}
DUM_version: ${formData.dumVersion}
modified_prompt: ${formData.isModified}
model: ${modelYaml}
parameters: 
  max_tokens: ${formData.hasMaxTokens ? formData.maxTokens : null}
  temperature: ${formData.hasTemperature ? formData.temperature : null}
  top_p: ${formData.hasTopP ? formData.topP : null}
  frequency_penalty: ${formData.hasFrequencyPenalty ? formData.frequencyPenalty : null}
  presence_penalty: ${formData.hasPresencePenalty ? formData.presencePenalty : null}
link: "${formData.conversationLink}"
---    

# Title: ${titleMarkdown}
**description:** ${descriptionMarkdown}

## Details

<details>
<summary>Click to expand</summary>

| Detail | Value |
| --- | --- |
| Formatter Version | ${formData.formatterVersion} |
| Conversation Title | ${titleMarkdown} |
| Short Description | ${descriptionMarkdown} |
| Date | ${dateString} |
| DUM Version | ${formData.dumVersion} |
| Modified Prompt | ${formData.isModified ? "Yes" : "No"} |
| System Message | ${formData.systemMessage ? "Yes" : "No"} |
| Model | ${formData.conversationModel} |
| Link | ${linkMarkdown} |

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

export default markdownTemplate;