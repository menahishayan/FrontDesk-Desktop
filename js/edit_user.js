// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use strict'

const { ipcRenderer, remote } = require('electron')
const db = require('./js/db')
const showError = require('./js/showError')

const setValue = (field, value) => {
    document.getElementById(field).value = value;
}

ipcRenderer.on('edit-user', (e, userData) => {
    document.getElementById('changeForm').style.display = 'none'

    document.getElementById('change2').addEventListener('click', (e) => {
        e.preventDefault();
    })
})
