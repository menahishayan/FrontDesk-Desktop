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
const Window = require('./js/Window')

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "frontdesk"
});

createWindow = () => {
	loginWin = new Window({
		file: 'index.html',
		width: 700,
		height: 500,
		frame: false
	})


	loginWin.once('show', () => {
		db.connect(function(err) {
    		if (err) throw err;
			else {

			}
		});
	})

	ipcMain.on('event-window', () => {
    if (!eventWin) {
      eventWin = new Window({
		  file: 'events.html',
		  width: 1090,
  		height: 720,
		parent: loginWin
      })

	  // commented out during testing
	  // loginWin.close();

	  eventWin.once('show', () => {
		//db.query("SELECT E_ID,NAME,CATEGORY,COLOR FROM events ORDER BY CATEGORY OFFSET 1 ROW  ", function(err, result, fields) {
			db.query("SELECT E_ID,NAME,CATEGORY,COLOR FROM events order by case when category = 'MAIN STAGE' then 0 else 1 end, category ", function(err, result, fields) {
			if (err)
				dialog.showMessageBox(null, {
					type: 'error',
					buttons: ['OK'],
					defaultId: 2,
					title: 'Error',
					message: 'Query Error',
					detail: err
				}, (res) => {console.log(res);})
			else
				eventWin.webContents.send('events', result)
		});
	})
      // cleanup
      eventWin.on('closed', () => {
        eventWin = null
      })
    }
  })

  ipcMain.on('view-event-window', (e, id) => {
		if (!viewEventWin) {
			viewEventWin = new Window({
				file: 'view_event.html',
				width: 800,
				height: 680,
				parent: eventWin
			})

			viewEventWin.once('show', () => {
				db.query(`SELECT e.* , c.name  as a, s.phone as b FROM events e, coordinators c, students s WHERE E_ID=\'${id}\' and e.coordinators = c.usn and s.usn = e.coordinators`, function(err, result, fields) {
					if (err)
						dialog.showMessageBox(null, {
							type: 'error',
							buttons: ['OK'],
							defaultId: 2,
							title: 'Error',
							message: 'Query Error',
							detail: err.toString()
						}, (res) => {console.log(res);})
					else
						viewEventWin.webContents.send('view-event', result)
				});
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
