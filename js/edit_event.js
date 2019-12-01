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

ipcRenderer.on('edit-event', (e, eventData) => {

    if(!eventData) document.getElementById('header').innerHTML = 'Add Event'
    else {
        setValue('name',eventData['NAME'])
        setValue('category',eventData['CATEGORY'])
        setValue('venue',eventData['VENUE'])
        setValue('price',eventData['PRICE'])
        setValue('count',eventData['COUNT'])
        setValue('coordinator',eventData['COORDINATOR'])
        setValue('color',eventData['COLOR'])
    }

    document.getElementById('change2').addEventListener('click', (e) => {
        e.preventDefault();
    })
})
