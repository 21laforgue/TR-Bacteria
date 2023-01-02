const { ipcRenderer } = require('electron');

// Add code to handle the "file-data" event
ipcRenderer.on('file-data', (event, fileData) => {
  // Update the UI with the file data
  const fileDataElem = document.getElementById('file-data');
  fileDataElem.textContent = fileData;
});

document.getElementById('open-file').addEventListener('click', () => {
  ipcRenderer.send('app:open-file');
});

// Add code to handle the "open file" button click
const openFileBtn = document.getElementById('open-file');
openFileBtn.addEventListener('click', () => {
  // Send the "open-file" event to the main process
  ipcRenderer.send('app:on-file-open');
});

// Add code to handle the "save-comments" form submission
const commentsForm = document.getElementById('save-comments');
commentsForm.addEventListener('submit', event => {
  event.preventDefault();

  // Get the comments from the form
  const comments = document.getElementById('comments').value;

  // Send the "save-comments" event to the main process
  ipcRenderer.send('app:on-save-comments', comments);
});

// Add code to handle the "clear-comments" button click
const clearCommentsBtn = document.getElementById('clear-comments');
clearCommentsBtn.addEventListener('click', () => {
  // Send the "clear-comments" event to the main process
  ipcRenderer.send('app:on-clear-comments');
});

// Add code to handle the "file-copy" event
ipcRenderer.on('file-copy', (event, fileData) => {
  // Display a message to the user
  const copyStatus = document.getElementById('copy-status');
  copyStatus.textContent = 'File copied successfully!';

  // Clear the message after 3 seconds
  setTimeout(() => {
    copyStatus.textContent = '';
  }, 3000);
});

// Add code to handle the "file-delete" event
ipcRenderer.on('file-delete', (event, fileData) => {
  // Remove the file from the UI
  const fileItem = document.getElementById(fileData.name);
  fileItem.remove();

  // Display a message to the user
  const deleteStatus = document.getElementById('delete-status');
  deleteStatus.textContent = 'File deleted successfully!';

  // Clear the message after 3 seconds
  setTimeout(() => {
    deleteStatus.textContent = '';
  }, 3000);
});

// Add code to handle the "file-open" event
ipcRenderer.on('file-open', (event, fileData) => {
  // Display the file contents in the UI
  const fileDataElem = document.getElementById('file-data');
  fileDataElem.textContent = fileData;
});

// Add code to handle the "comments-saved" event
ipcRenderer.on('comments-saved', (event, comments) => {
  // Display a message to the user
  const saveStatus = document.getElementById('save-status');
  saveStatus.textContent = 'Comments saved successfully!';

  // Clear the message after 3 seconds
  setTimeout(() => {
    saveStatus.textContent = '';
  }, 3000);
});

// Add code to handle the "comments-cleared" event
ipcRenderer.on('comments-cleared', (event, comments) => {
  // Clear the comments from the UI
  const commentsElem = document.getElementById('comments');
  commentsElem.value = '';

  // Display a message to the user
  const clearStatus = document.getElementById('clear-status');
  clearStatus.textContent = 'Comments cleared successfully!';

  // Clear the message after 3 seconds
  setTimeout(() => {
    clearStatus.textContent = '';
  }, 3000);
});

