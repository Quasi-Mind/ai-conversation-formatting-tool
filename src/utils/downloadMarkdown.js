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

export default downloadMarkdown;