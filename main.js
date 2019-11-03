const path = require('path')

const {
	app,
	BrowserWindow,
	dialog,
	ipcMain
} = require('electron')

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

let loginWin
var mysql = require('mysql');
const Window = require('./Window')

let sample_db = require('./sample_db.json')

// create a new todo store name "Todos Main"
const db = mysql.createConnection({
	host: "http://databases.000webhost.com/db_structure.php?db=id10729791_frontdesk",
	user: "id10729791_admin",
	password: "nish..."
});
//
// const options = {
// 	type: 'question',
// 	buttons: ['Cancel', 'Yes, please', 'No, thanks'],
// 	defaultId: 2,
// 	title: 'Question',
// 	message: 'Do you want to do this?',
// 	detail: 'Connected'
// };

createWindow = () => {
	loginWin = new BrowserWindow({
		width: 700,
		height: 500,
		webPreferences: {
			nodeIntegration: true
		},
		titleBarStyle: 'hidden'
	})

	loginWin.loadFile('index.html')

	let eventWin

	// win.webContents.openDevTools()

	// con.connect(function(err) {
	// 	if (err) throw err;
	// 	else dialog.showMessageBox(null, options, (response, checkboxChecked) => {
	// 		console.log(response);
	// 		console.log(checkboxChecked);
	// 	});
	// });

	ipcMain.on('event-window', () => {
    if (!eventWin) {
      eventWin = new Window({
		  file: 'events.html',
		  width: 1080,
  		height: 720,
		parent: loginWin
      })

	  // loginWin.close();

	  eventWin.once('show', () => {
	    eventWin.webContents.send('events', sample_db.events)
	  })

      // cleanup
      eventWin.on('closed', () => {
        eventWin = null
      })
    }
  })

	loginWin.on('closed', () => {
		loginWin = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	app.quit()
})
