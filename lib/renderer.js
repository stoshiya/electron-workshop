const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const marked = require('marked');

const mainProcess = remote.require('./main');
const clipboard = remote.clipboard;

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

$openFileButton.addEventListener('click', () => {
  mainProcess.openFile();
});

$copyFileButton.addEventListener('click', () => {
  const html = $htmlView.innerHTML;
  clipboard.writeText(html);
});
