const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});

// Add code to handle the "app:on-file-copy" event
ipcMain.on('app:on-file-copy', (event, fileData) => {
  // Copy the file to a new location
  fs.copyFile(fileData.filepath, `/new/location/${fileData.name}`, err => {
    if (err) throw err;
    console.log('File copied to new location');
  });
});

// Add code to handle the "app:on-file-delete" event
ipcMain.on('app:on-file-delete', (event, fileData) => {
  // Delete the file
  fs.unlink(fileData.filepath, err => {
    if (err) throw err;
    console.log('File deleted');
  });
});

// Add code to handle the "app:on-file-open" event
ipcMain.on('app:on-file-open', (event, fileData) => {
    // get path of the file
    const filepath = fileData.filepath;
  
    // open the file
    fs.readFile(filepath, 'utf-8', (error, data) => {
      if (error) {
        event.sender.send('app:on-file-open-error', error);
        return;
      }
  
      // send the file data back to the renderer process
      event.sender.send('app:on-file-open-success', { id: fileData.id, data });
    });
  });
  