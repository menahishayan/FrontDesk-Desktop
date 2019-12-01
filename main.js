const path = require('path')

const {
	app,
	BrowserWindow,
	dialog,
	ipcMain,
} = require('electron')

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

let loginWin, eventWin, viewEventWin, userWin, loginUSN , isAdmin = false
const Window = require('./js/Window')

const db = require('./js/db')
const showError = require('./js/showError')


createWindow = () => {
	const {screen} = require('electron')
	var dimensions = screen.getPrimaryDisplay().size, widthAdjustFactor = dimensions.width/1440, heightAdjustFactor = dimensions.height/900;
	
	loginWin = new Window({
		file: 'index.html',
		width: 700*widthAdjustFactor,
		height: 500*heightAdjustFactor
	})

	loginWin.once('show', () => {
		db.connect((err) => {if (err) showError(err)});
	})

	ipcMain.on('event-window', (e, usn) => {
    if (!eventWin) {
      eventWin= new Window({
		  file: 'events.html',
		  width: 1079*widthAdjustFactor,
  		height: 720*heightAdjustFactor,
		parent: loginWin
      })

	  // commented out during testing
	  // loginWin.close();
	  loginUSN = usn

	  eventWin.once('show', () => {
			db.query(`SELECT ROLE as ROLE FROM coordinators where USN = \'${loginUSN}\' `, function(err, result, fields) {
				if (err) showError(err)
				else isAdmin = (result[0]['ROLE'] != "Coordinator") ? true : false;
			});
			db.query("SELECT E_ID,NAME,CATEGORY,COLOR FROM events order by case when category = 'MAIN STAGE' then 0 else 1 end, category ", function(err, result, fields) {
				if (err) showError(err)
				else eventWin.webContents.send('events', result , isAdmin)
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
				width: 800*widthAdjustFactor,
				height: 680*heightAdjustFactor,
				parent: eventWin
			})

			viewEventWin.once('show', () => {
				db.query(`SELECT e.* , s.name  as a, s.phone as b FROM events e, coordinators c, students s WHERE E_ID=\'${id}\' and e.COORDINATOR = c.usn and s.usn = e.COORDINATOR`, function(err, result, fields) {
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

	ipcMain.on('edit-event-window', (e, id) => {
  		if (!viewEventWin) {
  			viewEventWin = new Window({
  				file: 'edit_event.html',
  				width: 620*widthAdjustFactor,
  				height: 520*heightAdjustFactor,
  				parent: eventWin
  			})

  			viewEventWin.once('show', () => {
  				(id != 'add') ? db.query(`SELECT e.* , s.name  as a, s.phone as b FROM events e, coordinators c, students s WHERE E_ID=\'${id}\' and e.COORDINATOR = c.usn and s.usn = e.COORDINATOR`, function(err, result, fields) {
  					if (err) showError(err)
  					else viewEventWin.webContents.send('edit-event', result[0])
  				}) : viewEventWin.webContents.send('edit-event')
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
  				width: 300*widthAdjustFactor,
  				height: 350*heightAdjustFactor,
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

	ipcMain.on('edit-user-window', (e, id) => {
  		if (!userWin) {
  			userWin = new Window({
  				file: 'edit_user.html',
  				width: 740*widthAdjustFactor,
  				height: 620*heightAdjustFactor,
  				parent: eventWin
  			})

  			userWin.once('show', () => {
				db.query(`SELECT  * FROM auth a,coordinators c,students s WHERE a.USN=\'${loginUSN}\' and a.USN=c.USN and a.USN=s.USN`, function(err, result, fields) {
  					if (err) showError(err)
  					else userWin.webContents.send('edit-user', result[0])
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
