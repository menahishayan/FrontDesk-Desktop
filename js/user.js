// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use strict'

const { ipcRenderer, remote } = require('electron')
const db = require('./js/db')
const showError = require('./js/showError')

const setValue = (field, value) => {
    document.getElementById(field).innerHTML = value;
}

ipcRenderer.on('view-user', (e, userData) => {
    setValue('USN',userData['USN'])
    setValue('name',userData['NAME'])
    setValue('sem',userData['SEM'])
    setValue('section',userData['SECTION'])
    setValue('dept',userData['DEPT'])
    setValue('phone','+91 '+ userData['PHONE'])
    setValue('role',userData['ROLE'])

    document.getElementById('change1').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('user').style.display = 'none'
        document.getElementById('changeForm').style.display = 'block'
    })

    document.getElementById('change2').addEventListener('click', (e) => {
        e.preventDefault();

        let oldpass =  document.getElementById('oldpass').value;
        let newpass =  document.getElementById('newpass').value;
        let newpass2 =  document.getElementById('confirm').value;

        if (oldpass.length>0 && newpass.length>0 && newpass2.length>0) {
            if(newpass==newpass2) {
                db.query(`CALL CHANGEPASS(\'${userData['USN']}\',\'${oldpass}\',\'${newpass}\')`, (err, result, fields) => {
                    if(err) showError(err)
                    else {
                        document.getElementById('changeForm').style.display = 'none';
                        document.getElementById('user').innerHTML = "<img src=\"images/tick.gif\" alt=\"tick\" class=\"tick\" id=\"tick\" width=\"260px\">"
                        document.getElementById('user').style.display = 'block';
                        document.getElementById('tick').className = 'visible15';

                        setTimeout(function() {
            				setInterval(function() {
            					$('#tick').attr('src', $('#tick').attr('src'))
            				}, 1)
            				document.getElementById('tick').className = 'hidden35';
                            remote.getCurrentWindow().close()
            			}, 1800)
                    }
                })
            } else showError("Passwords do not match.")
        } else showError("Please fill all the fields first.")
    })
})
