'use strict'

const { BrowserWindow } = require('electron')

// default window settings
const defaultProps = {
  width: 1000,
  height: 750,
  show: false,

  // update for electron V5+
  webPreferences: {
      nodeIntegration: true
  },
  titleBarStyle: 'hidden'
}

class Window extends BrowserWindow {
  constructor ({ file, zoom, ...windowSettings }) {
    // calls new BrowserWindow with these props
    super({ ...defaultProps, ...windowSettings })

    // load the html and open devtools
    this.loadFile(file)
    // this.webContents.openDevTools()

    // gracefully show when ready to prevent flickering
    this.once('ready-to-show', () => {
        this.webContents.setZoomFactor(zoom ? zoom : 0.75)
      this.show()
    })
  }
}

module.exports = Window
