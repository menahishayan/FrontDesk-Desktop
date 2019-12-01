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
        console.log(document.getElementById("name").value );
        //console.log(document.getElementById("time").value );
        //console.log(document.getElementById("date").value )
        //console.log(document.getElementById("duration").value)
        console.log(document.getElementById("venue").value)
        console.log(document.getElementById("price").value)
        console.log(document.getElementById("coordinator").value)
        console.log(document.getElementById("count").value)
        console.log(document.getElementById("color").value)
        console.log(document.getElementById("category").value)
        
        /*db.query(`UPDATE events SET "NAME" = ${document.getElementById("name").value} and "TIME" = ${document.getElementById("time").value} and "DATE" = ${document.getElementById("date").value} and "DURATION" = ${document.getElementById("duration").value} and "VENUE" = ${document.getElementById("venue").value} and "PRICE" = ${document.getElementById("price").value} and "COORDINATOR" = ${document.getElementById("coordinator").value} and "TEAM_COUNT" = ${document.getElementById("count").value} and "COLOR" = ${document.getElementById("color").value} and "CATEGORY" = ${document.getElementById("category").value} WHERE "E_ID" = ${eventData["E_ID"]}`, function(err, result, fields) {
            if (err) showError(err)
            else eventWin.webContents.send('events', result , isAdmin)
        });*/
    })

    

    
    
})
