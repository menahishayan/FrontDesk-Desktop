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

let color = ''

const setColor = () => {
    document.getElementById('body').querySelectorAll('.item-container').forEach(i => {
        i.style.width = '60px'
        i.style.height = '40px'
        i.style.border = '0px'
    })
    let selectedItem = document.getElementById(color);
    selectedItem.style.border = '5px solid #E6672F'
    selectedItem.style.width = '63px'
    selectedItem.style.height = '43px'
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
        color = eventData['COLOR'] || 'RED'
        setColor();
    }

    document.getElementById('body').querySelectorAll('.item-container').forEach(i => {
        i.addEventListener('click', (e) => {
            color = i.id;
            setColor();
        })
    })

    document.getElementById('change2').addEventListener('click', (e) => {
        e.preventDefault();
    })
})
