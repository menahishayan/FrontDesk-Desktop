'use strict'

const { ipcRenderer, remote } = require('electron')
const db = require('./js/db')
const showError = require('./js/showError')

const setValue = (field, value) => {
    document.getElementById(field).value = value;
}

ipcRenderer.on('edit-user', (e, userData) => {
    document.getElementById('changeForm').style.display = 'none'
    setValue('USN',userData['USN'])
    setValue('name',userData['NAME'])
    setValue('sem',userData['SEM'])
    setValue('section',userData['SECTION'])
    setValue('dept',userData['DEPT'])
    setValue('phone','+91 '+ userData['PHONE'])
    setValue('role',userData['ROLE'])

    document.getElementById('change2').addEventListener('click', (e) => {
        e.preventDefault();
    })
})
