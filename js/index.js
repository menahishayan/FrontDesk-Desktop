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
    let pass = document.getElementById('pass').value;

    db.query(`CALL LOGIN(\'${usn}\', \'${pass}\')`, (err, result, fields) =>
        result[0][0]['RESPONSE'] ? ipcRenderer.send('event-window', usn) : showError("Invalid Username or Password")
    )
} : () => ipcRenderer.send('event-window', "1AM17CS101"))
