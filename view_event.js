'use strict'

const { ipcRenderer } = require('electron')
const moment = require('moment');

String.prototype.capitalizeEachWord = function() {
    this.toLowerCase();
    let str = this.split(" ");

    for (var i = 0, x = str.length; i < x; i++)
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);

    return str.join(" ");
}

const collapseLeft = function () {
    document.querySelector('.container-left').style.width = '450px';
    document.getElementById('categoryContainer').className = 'hidden35';
    document.getElementById('body').className = 'hidden15';
}

const expandLeft = function () {
    document.querySelector('.container-left').style.width = '720px';
    document.getElementById('categoryContainer').className = 'visible15';
    document.getElementById('body').className = 'visible35';
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
      document.getElementById('body').innerHTML += `<span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf073;"></span>
                ${moment(obj[0]['DATE']).format("MMM DD, YYYY")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf017;"></span>
             ${moment(obj[0]['TIME'], "HH:mm:ss", true).format("hh:mm A")} - ${moment(obj[0]['TIME'], "HH:mm:ss", true).add(obj[0]['DURATION'], 'minutes').format("hh:mm A")}<br><br>
              <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf02d;"></span>
                ${obj[0]['RULES']}<br><br>
                <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf0c0;"></span>
                  ${obj[0]['TEAM_COUNT']} in a team<br><br>
                  <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf2bb;"></span>
                    ${obj[0]['fuck']} , Ph: ${obj[0]['suck']}<br><br>`
                    // Ticket
  let gradient = getComputedStyle(document.querySelector('.gradient-' + obj[0]['COLOR'].toUpperCase())).background.split('-webkit-linear-gradient(top, ')[1].split(' 100%)')[0].split(' 0%, ');
  document.getElementById('grad1').innerHTML += `<stop offset="0%" style="stop-color: ${gradient[0]}" />
  <stop offset="100%" style="stop-color: ${gradient[1]}" />`

  document.getElementById('ticketContainer').addEventListener('click', () => {
      if(document.querySelector('.container-left').style.width != '450px')
        collapseLeft();
      else expandLeft();
  });
})
