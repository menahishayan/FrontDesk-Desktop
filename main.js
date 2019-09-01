const {
	app,
	BrowserWindow
} = require('electron')

let win

createWindow = () => {
	win = new BrowserWindow({
		width: 900,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	win.loadFile('index.html')

	// win.webContents.openDevTools()

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	app.quit()
})
