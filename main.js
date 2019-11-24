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

let loginWin, eventWin, viewEventWin, userWin, loginUSN
const Window = require('./js/Window')

const db = require('./js/db')
const showError = require('./js/showError')

createWindow = () => {
	loginWin = new Window({
		file: 'index.html',
		width: 700,
		height: 500
	})

	loginWin.once('show', () => {
		db.connect((err) => {if (err) showError(err)});
	})

	ipcMain.on('event-window', (e, usn) => {
    if (!eventWin) {
      eventWin= new Window({
		  file: 'events.html',
		  width: 1079,
  		height: 720,
		parent: loginWin
      })

	  // commented out during testing
	  // loginWin.close();
	  loginUSN = usn

	  eventWin.once('show', () => {
			db.query("SELECT E_ID,NAME,CATEGORY,COLOR FROM events order by case when category = 'MAIN STAGE' then 0 else 1 end, category ", function(err, result, fields) {
				if (err) showError(err)
				else eventWin.webContents.send('events', result)
			});
	});

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
				db.query(`SELECT e.* , s.name  as a, s.phone as b FROM events e, coordinators c, students s WHERE E_ID=\'${id}\' and e.coordinators = c.usn and s.usn = e.coordinators`, function(err, result, fields) {
					if (err) showError(err)
					else viewEventWin.webContents.send('view-event', result, loginUSN)
				});
			})

			// cleanup
			viewEventWin.on('closed', () => {
				viewEventWin = null
			})
		}
	})

	ipcMain.on('user-window', () => {
  		if (!userWin) {
  			userWin = new Window({
  				file: 'user.html',
  				width: 300,
  				height: 350,
  				parent: eventWin
  			})

  			userWin.once('show', () => {
  				db.query(`SELECT  * FROM auth a,coordinators c,students s WHERE a.USN=\'${loginUSN}\' and a.USN=c.USN and a.USN=s.USN`, function(err, result, fields) {
  					if (err) showError(err)
  					else userWin.webContents.send('view-user', result[0])
  				});
  			})

  			// cleanup
  			userWin.on('closed', () => {
  				userWin = null
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
