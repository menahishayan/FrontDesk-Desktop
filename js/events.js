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
ipcRenderer.on('events', (event, events, admin) => {
  // get the eventList ul
  const eventList = document.getElementById('eventList')
  // create html string
  const eventItems = events.reduce((html, e) => {
    html += `<li id="${e['E_ID']}" class="event-item">
    <div class="item-container gradient-${e['COLOR'].toUpperCase()}">
        <span class="fa-icon" data-placeholder="&#xf040;" style="color: white;font-size:18px;position: relative; left: 168px; visibility: ${admin ? 'visible' : 'hidden'};"></span>
        <div class="item-name" style="position: relative; top:-30px;">${e['NAME'].capitalizeEachWord()}</div>
        <div class="item-sub" style="position: relative; top:-30px;">${e['CATEGORY']}</div>
    </div>
    </li>`

    return html
  }, '')

  let addEventButton = `<li id="add" class="event-item">
  <div class="item-container gradient-RAINBOW add-event">
        <span class="fa-icon-container" data-placeholder="&#xf055;"></span>
  </div>
  </li>`

  // set list html to the event items
  eventList.innerHTML = (admin ? addEventButton : '') + eventItems

  // add click handlers to delete the clicked event
  eventList.querySelectorAll('.event-item').forEach(item => {
     item.addEventListener('click', () => {ipcRenderer.send((admin ? 'edit' : 'view') + '-event-window', item.id)})
  })

  document.getElementById('logout').addEventListener('click', () => remote.getCurrentWindow().close())
  document.getElementById('viewUser').addEventListener('click', () => ipcRenderer.send((admin ? 'edit-' : '') + 'user-window'))
})
