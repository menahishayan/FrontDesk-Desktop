'use strict'

const { ipcRenderer } = require('electron')

// delete event by its text value ( used below in event listener)
const viewEvent = (e, item) => {
  console.log(item);
  
  ipcRenderer.send('view-event-window', item)
}

// create add event window button
// document.getElementById('createEventBtn').addEventListener('click', () => {
//   ipcRenderer.send('add-event-window')
// })

// on receive events
ipcRenderer.on('events', (event, events) => {
  // get the eventList ul
  const eventList = document.getElementById('eventList')

  // create html string
  const eventItems = events.reduce((html, e) => {
    html += `<li id="${e['E_ID']}" class="event-item">
    <div class="item-container gradient-${e['COLOR']}">
        <div class="item-name">${e['NAME']}</div>
        <div class="item-sub">${e['CATEGORY']}</div>
    </div>
    </li>`

    return html
  }, '')

  // set list html to the event items
  eventList.innerHTML = eventItems

  // add click handlers to delete the clicked event
  eventList.querySelectorAll('.event-item').forEach(item => {
    console.log(item)
    item.addEventListener('click', viewEvent(this))
  })
})
