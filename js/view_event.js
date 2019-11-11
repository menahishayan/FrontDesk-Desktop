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

ipcRenderer.on('view-event', (e, obj) => {
  const eventHeader = document.getElementById('eventHeader')
  eventHeader.innerHTML = obj[0]['NAME'].capitalizeEachWord()

  const categoryContainer = document.getElementById('categoryContainer')

  categoryContainer.innerHTML =
    `<div class="item-container-min gradient-${obj[0]['COLOR'].toUpperCase()}">
    ${obj[0]['CATEGORY'].toUpperCase()}
    </div>`

  const eventBody = document.getElementById('body')
  let data = `<span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf073;"></span>
                ${moment(obj[0]['DATE']).format("MMM DD, YYYY")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf017;"></span>
              ${moment(obj[0]['TIME'], "HH:mm:ss", true).format("hh:mm A")} - ${moment(obj[0]['DURATION'], "HH:mm:ss", true).format("hh:mm")}<br><br>
              <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf02d;"></span>
                ${obj[0]['RULES']}<br><br>
                <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf0c0;"></span>
                  ${obj[0]['TEAM_COUNT']} in a team<br><br>
                  <span class="fa-icon body-items ${obj[0]['COLOR'].toUpperCase()}" data-placeholder="&#xf2bb;"></span>
                    ${obj[0]['a']} , Ph: ${obj[0]['b']}<br><br>`
  // keys.forEach(k => {
  //     data+= k + ": " + obj[0][k] + "<br>"
  // })
  eventBody.innerHTML += data
})
