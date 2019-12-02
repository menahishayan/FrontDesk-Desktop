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

const updateCoord = (name, phone, dept, sem, section, role) => {
	db.query(`update students set
             DEPT=\'${dept}\',
             SEM=${sem},
             SECTION=\'${section}\',
             PHONE=${phone},
             NAME=\'${name}\'
             WHERE USN=\'${selectedUSN}\'`,
		function(err, result, fields) {
			if (err) showError(err)
			else db.query(`update coordinators set
                    ROLE = \'${role}\'
                    WHERE USN=\'${selectedUSN}\'`,
				function(err2, result, fields) {
					if (err2) showError(err2)
					else {
                        document.getElementById('changeForm').style.display = 'none';
                        document.getElementById('body').innerHTML = "<center><img src=\"images/tick.gif\" alt=\"tick\" class=\"tick\" id=\"tick\" width=\"260px\" style=\"margin-top:130px;\"></center>"
                        document.getElementById('body').style.display = 'block';
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
		});
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


        db.query(`SELECT  s.*, c.*, AES_DECRYPT(a.PASSWORD, 'nish') as PASSWORD FROM auth a,coordinators c,students s WHERE a.USN=c.USN and a.USN=s.USN`, function(err, result, fields) {
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

        let name = document.getElementById("name").value,
            phone = document.getElementById("phone").value,
            dept = document.getElementById("dept").value,
            sem = document.getElementById("sem").value,
            section = document.getElementById("section").value,
            role = document.getElementById("role").value,
            newpass = document.getElementById("pass").value,
            newpass2 = document.getElementById("confirm").value

        if (newpass.length>0 || newpass2.length>0) {
            if(newpass==newpass2) {
                db.query(`CALL CHANGEPASS(\'${selectedUSN}\',\'${oldPass}\',\'${newpass}\')`, (err, result, fields) => {
                    if(err) showError(err)
                    else updateCoord(name, phone, dept, sem, section, role)
                })
            } else showError("Passwords do not match.")
        } else updateCoord(name, phone, dept, sem, section, role)
    })

})
