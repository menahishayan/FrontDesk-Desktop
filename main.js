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

let loginWin, eventWin, viewEventWin
var mysql = require('mysql');
const Window = require('./Window')

let sample_db = require('./sample_db.json')

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "frontdesk"
});

const options = {
	type: 'question',
	buttons: ['Cancel', 'Yes, please', 'No, thanks'],
	defaultId: 2,
	title: 'Question',
	message: 'Do you want to do this?',
	detail: 'Connected, Laddie. You are a wizard now!'
};

createWindow = () => {
	loginWin = new Window({
		file: 'index.html',
		width: 700,
		height: 500
	})


	loginWin.once('show', () => {
		db.connect(function(err) {
    		if (err) throw err;
			else {
				db.query("SELECT * FROM auth", function (err, result, fields) {
				if (err) throw err;
				let strOut = ""
				result.forEach(r => {
					strOut += " \n" + r['USN']
				});
				dialog.showMessageBox(null, {
					type: 'question',
					buttons: ['Cancel', 'OK'], 
					defaultId: 2,
					title: 'Result',
					message: 'Available Logins 🤣😂',
					detail: strOut
				}, (response) => {
				   console.log(response);
			   });
  			});
			}

    	});

	})
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

	  // commented out during testing
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

  ipcMain.on('view-event-window', () => {
  if (!viewEventWin) {
	viewEventWin = new Window({
		file: 'view_event.html',
		width: 1080,
	  height: 720,
	  parent: eventWin
	})

	// loginWin.close();

	viewEventWin.once('show', () => {
	  viewEventWin.webContents.send('viewEvent', sample_db.events)
	})

	// cleanup
	viewEventWin.on('closed', () => {
	  viewEventWin = null
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
