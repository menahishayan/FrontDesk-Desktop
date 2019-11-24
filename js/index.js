// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use strict'

const { ipcRenderer } = require('electron')
const db = require('./js/db')
const showError = require('./js/showError')

const debug = true

document.getElementById('login').addEventListener('click', !debug ? (e) => {
    e.preventDefault();
    let usn = document.getElementById('username').value.toUpperCase();
    db.query(`SELECT AES_DECRYPT(PASSWORD,'nish') AS PASSWORD FROM auth WHERE USN=\'${usn}\'`, (err, result, fields) => {
        if(result.length>0) {
            if (result[0]['PASSWORD'] == document.getElementById('pass').value)
                ipcRenderer.send('event-window', usn)
            else showError("Invalid Username or Password")
        }
        else showError("Invalid Username or Password")
    })
} : () => ipcRenderer.send('event-window'), "1AM17CS101")
