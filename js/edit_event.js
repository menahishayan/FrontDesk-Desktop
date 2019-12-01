'use strict'

const { ipcRenderer, remote } = require('electron')
const db = require('./js/db')
const showError = require('./js/showError')
const moment = require('moment');

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
        setValue('count',eventData['TEAM_COUNT'])
        setValue('coordinator',eventData['COORDINATOR'])
        setValue('time', moment(eventData['TIME'], "HH:mm:ss", true).format("HH:mm:ss"))
        setValue('date', moment(eventData['DATE']).format("YYYY-MM-DD"))
        setValue('duration', eventData['DURATION'])
        color = eventData['COLOR'] || 'RED'
        setColor()
    }
    document.getElementById('body').querySelectorAll('.item-container').forEach(i => {
        i.addEventListener('click', (e) => {
            color = i.id;
            setColor();
        })
    })


    document.getElementById('change2').addEventListener('click', (e) => {
        e.preventDefault();

          db.query( eventData ? `UPDATE events SET NAME = \'${document.getElementById("name").value}\', COLOR=\'${color}\', TIME = \'${moment(document.getElementById("time").value , "HH:mm", true).format("HH:mm:ss")}\', DURATION = ${document.getElementById("duration").value}, DATE = \'${document.getElementById("date").value}\', VENUE = \'${document.getElementById("venue").value}\', PRICE = \'${document.getElementById("price").value}\', COORDINATOR = \'${document.getElementById("coordinator").value}\', TEAM_COUNT = ${document.getElementById("count").value}, CATEGORY = \'${document.getElementById("category").value}\' WHERE E_ID = ${eventData["E_ID"]}` : 
         `CALL ADDEVENT(\'${document.getElementById("name").value}\',\'${document.getElementById("date").value}\',\'${moment(document.getElementById("time").value , "HH:mm", true).format("HH:mm:ss")}\',${document.getElementById("duration").value}, \'${document.getElementById("venue").value}\', \'${document.getElementById("price").value}\', \'${document.getElementById("coordinator").value}\', \'${document.getElementById("category").value}\', ${document.getElementById("count").value}, \'${color}\')`, function(err, result, fields) {
            if (err) showError(err)
            else{
                document.getElementById('body').innerHTML = "<center><img src=\"images/tick.gif\" alt=\"tick\" class=\"tick\" id=\"tick\" width=\"380px\" style=\"margin-top:60px;\"></center>"

    			setTimeout(function() {
    				setInterval(function() {
    					$('#tick').attr('src', $('#tick').attr('src'))
    				}, 1)
    				document.getElementById('body').className = 'hidden35';
                    remote.getCurrentWindow().close()
    			}, 1800)
            }
        }); 
    })





})
