'use strict'

const { ipcRenderer } = require('electron')

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
})
