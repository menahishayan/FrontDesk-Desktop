'use strict'

const {
	ipcRenderer
} = require('electron')
const moment = require('moment');
var mysql = require('mysql');

String.prototype.capitalizeEachWord = function() {
	this.toLowerCase();
	let str = this.split(" ");

	for (var i = 0, x = str.length; i < x; i++)
		str[i] = str[i][0].toUpperCase() + str[i].substr(1);

	return str.join(" ");
}

let detailsContent, registerContent;

const collapseLeft = function() {
	document.querySelector('.container-left').style.width = '450px';
	document.getElementById('categoryContainer').className = 'hidden35';
	document.getElementById('body').className = 'hidden35';

	document.getElementById('body').innerHTML = registerContent;

	document.getElementById('body').className = 'visible35';
}

const expandLeft = function() {
	document.querySelector('.container-left').style.width = '720px';
	document.getElementById('categoryContainer').className = 'visible15';
	document.getElementById('body').className = 'hidden35';

	document.getElementById('body').innerHTML = detailsContent;

	document.getElementById('body').className = 'visible35';
}

var mysql = require('mysql');

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "frontdesk"
});


const setup = () => {
    console.log("setup");
}

const register = (e_id, USN, DeskID, DeskUSN, DeskLoc) => {
    db.connect(function(err) {
        if (err) throw err;
        else {

        }
    });
    db.query(`insert into registration(E_ID,USN,DESK_USN) values(\'${e_id}\', \'${USN}\', \'${DeskUSN}\')`, function(err, result, fields) {
    if (err)
        // dialog.showMessageBox(null, {
        //     type: 'error',
        //     buttons: ['OK'],
        //     defaultId: 2,
        //     title: 'Error',
        //     message: 'Query Error',
        //     detail: err
        // }, (res) => {console.log(res);})
        console.log(err);
    else {

    }
});
}

ipcRenderer.on('view-event', (e, obj) => {
	// Heading
	document.getElementById('eventHeader').innerHTML = obj[0]['NAME'].capitalizeEachWord()

	//Category Label
	document.getElementById('categoryContainer').innerHTML =
		`<div class="item-container-min gradient-${obj[0]['COLOR'].toUpperCase()}">
    ${obj[0]['CATEGORY'].toUpperCase()}
    </div>`
	//Event desription
	detailsContent = `<span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf073;"></span>
                    ${moment(obj[0]['DATE']).format("MMM DD, YYYY")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf017;"></span>
                     ${moment(obj[0]['TIME'], "HH:mm:ss", true).format("hh:mm A")} - ${moment(obj[0]['TIME'], "HH:mm:ss", true).add(obj[0]['DURATION'], 'minutes').format("hh:mm A")}<br><br>
                      <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf02d;"></span>
                    ${obj[0]['RULES']}<br><br>
                    <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf0c0;"></span>
                      ${obj[0]['TEAM_COUNT']} in a team<br><br>
                  <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf2bb;"></span>
                    ${obj[0]['a']} , Ph: ${obj[0]['b']}<br><br>`

	registerContent = `<form class="login100-form validate-form p-b-33 p-t-5">
        <div class="wrap-input100 validate-input" data-validate="Enter USN">
            <input class="input100" type="text" id="USN" placeholder="USN">
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="name">
            <input class="input100" type="text" id="Name" placeholder="Name">
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter Phone">
            <input class="input100" type="text" id="phone" placeholder="Phone">
            <span class="focus-input100" data-placeholder="&#xe80f;""></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter Sem" width="45%">
            <input class="input100" type="number" id="sem" placeholder="Sem">
            <span class="focus-input100" data-placeholder="&#xe80f;""></span>
        </div>
        <div class="wrap-input100 validate-input" data-validate="Enter Section" width="45%">
            <input class="input100" type="text" id="section" placeholder="Section">
            <span class="focus-input100" data-placeholder="&#xe80f;""></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter Dept" width="45%">
            <input class="input100" type="text" id="dept" placeholder="Dept">
            <span class="focus-input100" data-placeholder="&#xe80f;""></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter Payment Mode" width="45%">
            <input class="input100" type="text" id="payment" placeholder="Payment Mode">
            <span class="focus-input100" data-placeholder="&#xe80f;""></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button id="login" class="login100-form-btn gradient-${obj[0]['COLOR'].toUpperCase()}-left">
                REGISTER
            </button>
        </div>

    </form>`
	document.getElementById('body').innerHTML = detailsContent;
	// Ticket
	let gradient = getComputedStyle(document.querySelector('.gradient-' + obj[0]['COLOR'].toUpperCase())).background.split('-webkit-linear-gradient(top, ')[1].split(' 100%)')[0].split(' 0%, ');
	document.getElementById('grad1').innerHTML += `<stop offset="0%" style="stop-color: ${gradient[0]}" />
  <stop offset="100%" style="stop-color: ${gradient[1]}" />`

	document.getElementById('ticketContent').innerHTML += `<p class="ticket-content-head">${obj[0]['NAME'].capitalizeEachWord()}</p>
                                                      <p class="ticket-content-sub">${moment(obj[0]['DATE']).format("MMM DD, YYYY")},&nbsp;
                                                      ${moment(obj[0]['TIME'], "HH:mm:ss", true).format("hh:mm A")}</p>`;

	document.getElementById('ticketContainer').addEventListener('click', () => {
		if (document.querySelector('.container-left').style.width != '450px')
			collapseLeft();
		else expandLeft();
	});

    document.getElementById('login').addEventListener('click', () => {
		register(obj[0]['E_ID'], document.getElementById('USN').innerHTML, "D01", "1AM18CS033", "MAIN STAIRS")
	});

})
