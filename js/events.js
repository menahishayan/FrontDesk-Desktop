'use strict'

const { ipcRenderer, remote } = require('electron')

String.prototype.capitalizeEachWord = function() {
    this.toLowerCase();
    let str = this.split(" ");

    for (var i = 0, x = str.length; i < x; i++)
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);

    return str.join(" ");
}

// on receive events
ipcRenderer.on('events', (event, events) => {
  // get the eventList ul
  const eventList = document.getElementById('eventList')
  // create html string
  const eventItems = events.reduce((html, e) => {
    html += `<li id="${e['E_ID']}" class="event-item">
    <div class="item-container gradient-${e['COLOR'].toUpperCase()}">
        <div class="item-name">${e['NAME'].capitalizeEachWord()}</div>
        <div class="item-sub">${e['CATEGORY']}</div>
    </div>
    </li>`

    return html
  }, '')

  // set list html to the event items
  eventList.innerHTML = eventItems

  // add click handlers to delete the clicked event
  eventList.querySelectorAll('.event-item').forEach(item => {
    item.addEventListener('click', () => {ipcRenderer.send('view-event-window', item.id)})
  })

  document.getElementById('logout').addEventListener('click', () => remote.getCurrentWindow().close())
  document.getElementById('viewUser').addEventListener('click', () => ipcRenderer.send('user-window'))
})
