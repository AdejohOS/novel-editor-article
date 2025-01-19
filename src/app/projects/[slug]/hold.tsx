const jsonContentToHTML = (content: JSONContent): string => {
  // Convert JSONContent to HTML string
  // Implement this based on your rich text library
  return ""; // Replace with actual implementation
};

const htmlToJsonContent = (htmlString: string): JSONContent => {
  // Convert HTML string back to JSONContent
  // Implement this based on your rich text library
  return {} as JSONContent; // Replace with actual implementation
};

//Apply Codeblock Highlighting on the JSON from editor.getJSON()

const highlightCodeblocks = (content: JSONContent): JSONContent => {
  try {
    // Convert JSONContent to an HTML string
    const htmlString = jsonContentToHTML(content);

    // Parse the HTML content into a DOM structure
    const doc = new DOMParser().parseFromString(htmlString, "text/html");

    // Highlight all <pre><code> elements
    doc.querySelectorAll("pre code").forEach((el) => {
      if (el instanceof HTMLElement) {
        hljs.highlightElement(el); // Type-safe usage of highlight.js
      }
    });

    // Serialize the updated DOM back to a string
    const highlightedHTML = new XMLSerializer().serializeToString(doc);

    // Convert the highlighted HTML string back to JSONContent
    return htmlToJsonContent(highlightedHTML);
  } catch (error) {
    console.error("Error while highlighting code blocks:", error);
    return content; // Return the original content on failure
  }
};
