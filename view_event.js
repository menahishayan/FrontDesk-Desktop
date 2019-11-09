'use strict'

const { ipcRenderer } = require('electron')

// delete event by its text value ( used below in event listener)
/* const viewEvent = (e) => {
  ipcRenderer.send('view-event', e.target.textContent)
} */

// create add event window button
// document.getElementById('createEventBtn').addEventListener('click', () => {
//   ipcRenderer.send('add-event-window')
// })

// on receive events
ipcRenderer.on('view-event', (event, events) => {
  // get the eventList ul
  console.log(events);
  
  const eventHeader = document.getElementById('eventHeader')

  // set list html to the event items
  eventHeader.innerHTML = events['NAME']

  // add click handlers to delete the clicked event
  eventList.querySelectorAll('.event-item').forEach(item => {
    item.addEventListener('click', viewEvent(e))
  })
})
