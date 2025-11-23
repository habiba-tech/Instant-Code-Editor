const htmlInput = document.getElementById('htmlInput');
const cssInput = document.getElementById('cssInput');
const jsInput = document.getElementById('jsInput');
const preview = document.getElementById('preview');

const defaultHTML = `<div class="container">
  <h1>Hello, World!</h1>
  <p>Welcome to the Smart Code Editor</p>
  <button id="clickBtn">Click Me!</button>
  <p id="output"></p>
</div>`;

const defaultCSS = `.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  color: #2563eb;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #4b5563;
  font-size: 1.125rem;
  margin-bottom: 1rem;
}

button {
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #1d4ed8;
}`;

const defaultJS = `document.getElementById('clickBtn').addEventListener('click', function() {
  const output = document.getElementById('output');
  output.textContent = 'Button clicked! 🎉';
  output.style.color = '#059669';
  output.style.fontWeight = 'bold';
});`;

htmlInput.value = defaultHTML;
cssInput.value = defaultCSS;
jsInput.value = defaultJS;

function updatePreview() {
  const html = htmlInput.value;
  const css = cssInput.value;
  const js = jsInput.value;

  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        ${css}
      </style>
    </head>
    <body>
      ${html}
      <script>
        try {
          ${js}
        } catch (error) {
          console.error('JavaScript Error:', error);
          document.body.innerHTML += '<div style="color: red; padding: 16px; background: #fee; border: 1px solid #fcc; margin-top: 16px; border-radius: 4px;"><strong>JavaScript Error:</strong> ' + error.message + '</div>';
        }
      </script>
    </body>
    </html>
  `;

  preview.contentDocument.open();
  preview.contentDocument.write(content);
  preview.contentDocument.close();

  saveToLocalStorage();
}

function saveToLocalStorage() {
  const data = {
    html: htmlInput.value,
    css: cssInput.value,
    js: jsInput.value
  };
  localStorage.setItem('codeEditorData', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('codeEditorData');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      htmlInput.value = data.html || defaultHTML;
      cssInput.value = data.css || defaultCSS;
      jsInput.value = data.js || defaultJS;
      updatePreview();
    } catch (e) {
      console.error('Error loading saved data:', e);
      updatePreview();
    }
  } else {
    updatePreview();
  }
}

htmlInput.addEventListener('input', updatePreview);
cssInput.addEventListener('input', updatePreview);
jsInput.addEventListener('input', updatePreview);

loadFromLocalStorage();
