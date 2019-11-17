// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use strict'

const { ipcRenderer, dialog } = require('electron')

// create add todo window button
document.getElementById('login').addEventListener('click', () => {
  ipcRenderer.send('event-window')
  
})
