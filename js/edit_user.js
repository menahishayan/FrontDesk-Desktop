'use strict'

const { ipcRenderer, remote } = require('electron')
const db = require('./js/db')
const showError = require('./js/showError')

const setValue = (field, value) => {
    document.getElementById(field).value = value;
}

const setText = (field, value) => {
    document.getElementById(field).innerHTML = value;
}

let userList = '', selectedUSN = ''

ipcRenderer.on('edit-user', (e, userData) => {
    document.getElementById('changeForm').style.display = 'none'

    document.getElementById('userInfo').innerHTML =
        `<b>USN:</b> ${userData['USN']} &nbsp; &nbsp; &nbsp; &nbsp;
        <b>Name:</b> ${userData['NAME']} &nbsp; &nbsp; &nbsp; &nbsp;
        <b>Class:</b> ${userData['DEPT']} ${userData['SEM']} ${userData['SECTION']}
        <br>
        <b>Phone:</b> +91 ${userData['PHONE']} &nbsp; &nbsp; &nbsp; &nbsp;
        <b>Role:</b> ${userData['ROLE']}`

        db.query(`SELECT  * FROM auth a,coordinators c,students s WHERE a.USN=c.USN and a.USN=s.USN`, function(err, result, fields) {
            if (err) showError(err)
            else {
                result.forEach((r) => {
                    userList += `<tr id="${r['USN']}" class="tableItem">
                                  <td>${r['USN']}</td>
                                  <td>${r['NAME']}</td>
                                  <td>${r['PHONE']}</td>
                                  <td>${r['DEPT']} ${r['SEM']} ${r['SECTION']}</td>
                                  <td>${r['ROLE']}</td>
                                </tr>`
                })
                document.getElementById('tableBody').innerHTML = userList

                document.getElementById('body').querySelectorAll('.tableItem').forEach(i => {
                    i.addEventListener('click', (e) => {
                        document.getElementById('userInfo').style.display = 'none'
                        document.getElementById('userIcon').style.display = 'none'
                        document.getElementById('AllUsers').style.display = 'none'
                        document.getElementById('changeForm').style.display = 'block'
                    })
                })
            }
        });



    document.getElementById('change2').addEventListener('click', (e) => {
        e.preventDefault();
    })
})
