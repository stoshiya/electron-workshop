const electron = require('electron');
const ipc = electron.ipcRenderer;
const marked = require('marked');

const $ = selector => document.querySelector(selector);

const $markdownView = $('.raw-markdown');
const $htmlView = $('.rendered-html');
const $openFileButton = $('#open-file');
const $copyFileButton = $('#copy-file');
const $saveFileButton = $('#save-file');

ipc.on('file-opened', (event, files, content) => {
  $markdownView.value = content;
  renderMarkdownToHtml(content);
});

function renderMarkdownToHtml(markdown) {
  const html = marked(markdown);
  $htmlView.innerHTML = html;
}

$markdownView.addEventListener('keyup', (event) => {
  const content = event.target.value;
  renderMarkdownToHtml(content);
});
