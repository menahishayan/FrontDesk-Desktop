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

let userList = '', selectedUSN = '' , oldPass = ''

const viewEditUser = (user) => {
    selectedUSN = user['USN']
    document.getElementById('userInfo').innerHTML = '<b>Edit Coordinator<br>USN: </b>' + user['USN']
    document.getElementById('AllUsers').style.display = 'none'
    document.getElementById('changeForm').style.display = 'block'

    setValue('name', user['NAME'])
    setValue('phone', user['PHONE'])
    setValue('dept', user['DEPT'])
    setValue('sem', user['SEM'])
    setValue('section', user['SECTION'])
    setValue('role', user['ROLE'])
    oldPass = user['PASSWORD']
}

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
                result.forEach((r, index) => {
                    userList += `<tr id="${index}" class="tableItem">
                                  <td>${r['USN']}</td>
                                  <td>${r['NAME']}</td>
                                  <td>${r['PHONE']}</td>
                                  <td>${r['DEPT']} ${r['SEM']} ${r['SECTION']}</td>
                                  <td>${r['ROLE']}</td>
                                </tr>`
                })
                document.getElementById('tableBody').innerHTML = userList

                document.getElementById('body').querySelectorAll('.tableItem').forEach(i => {
                    i.addEventListener('click', () => {viewEditUser(result[i.id])})
                })
            }
        });

    document.getElementById('editButton').addEventListener('click', (e) => {
        e.preventDefault();
        // Rewrite the whole function

        let newpass = document.getElementById("pass").value
        let newpass2 = document.getElementById("confirm").value

        if (newpass.length>0 && newpass2.length>0) {
            if(newpass==newpass2) {
                db.query(`CALL CHANGEPASS(\'${selectedUSN}\',AES_DECRYPT(\'${oldPass}\', \'nish\'),\'${newpass}\')`, (err, result, fields) => {
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
        }

         db.query(`update students set
             DEPT=\'${document.getElementById("dept").value}\',
             SEM=${document.getElementById("sem").value},
             SECTION=\'${document.getElementById("section").value}\',
             PHONE=${document.getElementById("phone").value},
             NAME=\'${document.getElementById("name").value}\'
             WHERE USN =\'${selectedUSN}\';
             update coordinators set
             ROLE = \'${document.getElementById("role").value}\',
             WHERE USN =\'${selectedUSN}\';`,
             function(err, result, fields) {
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
