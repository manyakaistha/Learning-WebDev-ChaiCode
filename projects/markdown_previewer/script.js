// Configure marked.js options
marked.setOptions({
    breaks: true,  // Enable line breaks
    highlight: function(code, lang) {
        // Use highlight.js for code block highlighting
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {}
        }
        return hljs.highlightAuto(code).value;
    }
});

// DOM Elements
const markdownInput = document.getElementById('markdownInput');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clearBtn');

// Update preview with formatted markdown
function updatePreview() {
    const markdownText = markdownInput.value;
    const htmlContent = marked.parse(markdownText);
    preview.innerHTML = htmlContent;

    // Highlight all code blocks in the preview
    preview.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
}

// Event Listeners
markdownInput.addEventListener('input', updatePreview);

clearBtn.addEventListener('click', () => {
    markdownInput.value = '';
    updatePreview();
});

// Initial preview with placeholder text
markdownInput.value = `# Welcome to Markdown Previewer!

## Try out these markdown elements:

### Headers

#### Like this one!

### Emphasis
**Bold text** and *italic text*

### Lists
1. First item
2. Second item
3. Third item

- Unordered list
- Another item
- And another

### Links
[Visit GitHub](https://github.com)

### Code
Inline \`code\` looks like this

\`\`\`javascript
// Code block with syntax highlighting
function greet(name) {
    console.log("Hello, " + name + "!");
}
\`\`\`

### Blockquotes
> This is a blockquote.
> It can span multiple lines.

### Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`;

// Initialize preview
updatePreview();