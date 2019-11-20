'use strict'

const { ipcRenderer } = require('electron')
const moment = require('moment');
var QRCode = require('qrcode')
const db = require('./js/db')
const showError = require('./js/showError')

String.prototype.capitalizeEachWord = function() {
	this.toLowerCase();
	let str = this.split(" ");

	for (var i = 0, x = str.length; i < x; i++)
		str[i] = str[i][0].toUpperCase() + str[i].substr(1);

	return str.join(" ");
}

let detailsContent, registerContent, eventData, userData, registerStatus = false;

const collapseLeft = function() {
	document.querySelector('.container-left').style.width = '450px';
	document.getElementById('categoryContainer').className = 'hidden35';
	document.getElementById('body').className = 'hidden35';

	document.getElementById('body').innerHTML = registerContent;

	document.getElementById('body').className = 'visible35';

	document.getElementById('register').addEventListener('click', (e) => {
		e.preventDefault();

		userData = {
			USN: document.getElementById('USN').value,
			name: document.getElementById('Name').value,
			phone: document.getElementById('phone').value,
			sem: document.getElementById('sem').value,
			sec: document.getElementById('section').value,
			dept: document.getElementById('dept').value,
		}

		register(eventData['E_ID'], userData, "1AM17CS132")
	});

	document.getElementById('USN').addEventListener('input', () => {
		checkUSN(document.getElementById('USN').value)
	});
}

const expandLeft = function() {
	document.querySelector('.container-left').style.width = '720px';
	document.getElementById('categoryContainer').className = 'visible15';
	document.getElementById('body').className = 'hidden35';

	document.getElementById('body').innerHTML = detailsContent;

	document.getElementById('body').className = 'visible35';
}

const checkUSN = (usn) => {
	if(usn.length == 10) {
		document.getElementById('body').querySelectorAll('.fetchable').forEach(f => {
			f.style.display = 'flex';
		})
		db.query(`SELECT * FROM students WHERE USN=\'${usn}\'`, (err, result, fields) => {
			if (result.length>0) {
				document.getElementById('Name').value = result[0]['NAME'];
				document.getElementById('phone').value = result[0]['PHONE'];
				document.getElementById('sem').value = result[0]['SEM'];
				document.getElementById('section').value = result[0]['SECTION'];
				document.getElementById('dept').value = result[0]['DEPT'];
			} else {
				document.getElementById('Name').value = "";
				document.getElementById('phone').value = "";
				document.getElementById('sem').value = "";
				document.getElementById('section').value = "";
				document.getElementById('dept').value = "";
			}
		})
	} else {
		document.getElementById('body').querySelectorAll('.fetchable').forEach(f => {
			f.style.display = 'none';
		})
	}
}

const register = (e_id, user, DeskUSN) => {
	db.query(`CALL REGISTER(${e_id}, \'${user.USN}\', \'${user.name}\', \'${user.phone}\', ${user.sem}, \'${user.sec}\', \'${document.getElementById('payment').value}\', \'${DeskUSN}\', \'${user.dept}\')`, (err, result, fields) => {
		if(err) showError(err)
		else {
			registerStatus = true;
			document.getElementById('body').className = 'hidden15';
			document.getElementById('body').className = 'hidden15';
			document.getElementById('eventHeader').style.display = 'none';
			document.getElementById('categoryContainer').style.display = 'none';
			document.getElementById('hr').style.display = 'none';
			document.getElementById('body').innerHTML = ""
			document.getElementById('body').className = 'visible15';
			document.getElementById('body').innerHTML = "<img src=\"images/tick.gif\" alt=\"tick\" class=\"tick\" id=\"tick\" width=\"380px\">"

			setTimeout(function() {
				setInterval(function() {
					$('#tick').attr('src', $('#tick').attr('src'))
				}, 1)
				document.getElementById('body').className = 'hidden35';
				document.getElementById('containerLeft').style.width = '0px';

				document.getElementById('backText').innerHTML = "<span class=\"fa-icon body-items\" data-placeholder=\"&#xf030;\" style=\"color: #CCC;\"></span><br>Screenshot this M-Ticket<br>and share it with the participants"
			}, 1800)

			let qrData = Buffer.from(`{"R_ID": ${result[0][0]['_R_ID']}}`).toString('base64');
			console.log(qrData);
			QRCode.toCanvas(qr, qrData, {scale: 3.5}, (error) => {
			  if (error) console.error(error)
			})

			document.getElementById('ticketSub').innerHTML += `<br><br>ADMITS<br><b>${user.name}</b><br><br><br>Coordinated by ${eventData['a']}<br>(+91 ${eventData['b']})`
		}
	})

}

const getRules = (e_id) => {
	let rulesList = ''

	db.query(`SELECT * FROM rules WHERE E_ID=\'${e_id}\' ORDER BY RULE_NO`, (err, result, fields) => {
		if(!err) {
			let r;
			result.forEach((r) => {
				rulesList += r['RULE_NO'] + '. ' + r['RULES'] + '<br>'
			})
			document.getElementById('rlist').innerHTML = rulesList.length>0 ? rulesList : "No rules available";
			return rulesList
		} else console.log(err);
	})

}



ipcRenderer.on('view-event', (e, obj) => {

	eventData = obj[0];

	// Heading
	document.getElementById('eventHeader').innerHTML = eventData['NAME'].capitalizeEachWord()

	//Category Label
	document.getElementById('categoryContainer').innerHTML =
		`<div class="item-container-min gradient-${eventData['COLOR'].toUpperCase()}">
    ${eventData['CATEGORY'].toUpperCase()}
    </div>`
	//Event desription
	registerContent = `<form class="login100-form validate-form p-b-33 p-t-5">
        <div class="wrap-input100 validate-input" data-validate="Enter USN">
            <input class="input100" type="text" id="USN" placeholder="USN">
            <span class="focus-input100" data-placeholder="&#xe803;"></span>
        </div>

        <div class="wrap-input100 validate-input fetchable" data-validate="name">
            <input class="input100" type="text" id="Name" placeholder="Name">
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input fetchable" data-validate="Enter Phone">
            <input class="input100" type="text" id="phone" placeholder="Phone">
            <span class="focus-input100" data-placeholder="&#xe830;""></span>
        </div>

        <div class="wrap-input100 validate-input fetchable" data-validate="Enter Sem" width="45%">
            <input class="input100" type="number" id="sem" placeholder="Sem">
            <span class="focus-input100" data-placeholder="&#xe852;""></span>
        </div>
        <div class="wrap-input100 validate-input fetchable" data-validate="Enter Section" width="45%">
            <input class="input100" type="text" id="section" placeholder="Section">
            <span class="focus-input100" data-placeholder="&#xe852;""></span>
        </div>

        <div class="wrap-input100 validate-input fetchable" data-validate="Enter Dept" width="45%">
            <input class="input100" type="text" id="dept" placeholder="Dept">
            <span class="focus-input100" data-placeholder="&#xe852;""></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter Payment Mode" width="45%">
            <input class="input100" type="text" id="payment" placeholder="Payment Mode">
            <span class="focus-input100" data-placeholder="&#xe82f;""></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button id="register" class="login100-form-btn gradient-${obj[0]['COLOR'].toUpperCase()}-left">
                REGISTER
            </button>
        </div>

    </form>`



	detailsContent = `<span class="fa-icon body-items ${eventData['COLOR'].toUpperCase()}" data-placeholder="&#xf073;"></span>
                    ${moment(eventData['DATE']).format("MMM DD, YYYY")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="fa-icon body-items ${eventData['COLOR'].toUpperCase()}" data-placeholder="&#xf017;"></span>
                     ${moment(eventData['TIME'], "HH:mm:ss", true).format("hh:mm A")} - ${moment(eventData['TIME'], "HH:mm:ss", true).add(eventData['DURATION'], 'minutes').format("hh:mm A")}<br><br>
                      <span class="fa-icon body-items ${eventData['COLOR'].toUpperCase()}" data-placeholder="&#xf02d;"></span>
                    <div id="rlist" style="position: relative; top: -40px; left: 70px; margin-bottom: -70px;">${getRules(eventData['E_ID'])}</div><br><br>
                    <span class="fa-icon body-items ${eventData['COLOR'].toUpperCase()}" data-placeholder="&#xf0c0;"></span>
                      ${eventData['TEAM_COUNT']} in a team<br><br>
                  <span class="fa-icon body-items ${eventData['COLOR'].toUpperCase()}" data-placeholder="&#xf2bb;"></span>
                    ${eventData['a']}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					+91 ${eventData['b']}<br><br>`

	document.getElementById('body').innerHTML = detailsContent;
	// Ticket
	let gradient = getComputedStyle(document.querySelector('.gradient-' + eventData['COLOR'].toUpperCase())).background.split('-webkit-linear-gradient(top, ')[1].split(' 100%)')[0].split(' 0%, ');
	document.getElementById('grad1').innerHTML += `<stop offset="0%" style="stop-color: ${gradient[0]}" />
  <stop offset="100%" style="stop-color: ${gradient[1]}" />`

	document.getElementById('ticketContent').innerHTML += `<p class="ticket-content-head no-select">${eventData['NAME'].capitalizeEachWord()}</p>
                                                      <p class="ticket-content-sub no-select" id="ticketSub">${moment(eventData['DATE']).format("MMM DD, YYYY")},&nbsp;
                                                      ${moment(eventData['TIME'], "HH:mm:ss", true).format("hh:mm A")}</p>
													  <div class="qr-container no-select"><canvas id="qr" class="qr"></canvas></div>`;

	document.getElementById('ticketContainer').addEventListener('click', () => {
		if(!registerStatus) {
			if (document.querySelector('.container-left').style.width != '450px')
				collapseLeft();
			else expandLeft();
		}
	});

	QRCode.toCanvas(qr, "Please Register First", {scale: 3.5}, (error) => {
	  if (error) console.error(error)
	})


})
