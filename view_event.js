'use strict'

const { ipcRenderer } = require('electron')

ipcRenderer.on('view-event', (event, e_id) => {
  // get the eventList ul
  console.log(e_id);
})

ipcRenderer.on('view-event-window', (event, e_id) => {
  // get the eventList ul
  console.log(e_id);
})

ipcRenderer.on('testArg', (event, e_id) => {
  // get the eventList ul
  console.log(e_id);

  const eventHeader = document.getElementById('eventHeader')
  eventHeader.innerHTML = events['NAME']
})
