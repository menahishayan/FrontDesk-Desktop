'use strict'

const { ipcRenderer } = require('electron')

// delete event by its text value ( used below in event listener)
const viewEvent = (e) => {
  ipcRenderer.send('view-event', e.target.textContent)
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
    console.log(e);
    
    html += `<li class="event-item">
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
    item.addEventListener('click', viewEvent)
  })
})
