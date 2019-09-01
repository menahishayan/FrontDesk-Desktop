const {
	app,
	BrowserWindow,
	dialog
} = require('electron')

let win
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "http://databases.000webhost.com/db_structure.php?db=id10729791_frontdesk",
	user: "id10729791_admin",
	password: "nish..."
});

const options = {
	type: 'question',
	buttons: ['Cancel', 'Yes, please', 'No, thanks'],
	defaultId: 2,
	title: 'Question',
	message: 'Do you want to do this?',
	detail: 'Connected'
};

createWindow = () => {
	win = new BrowserWindow({
		width: 900,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		},
		titleBarStyle: 'hidden'
	})

	win.loadFile('index.html')

	// win.webContents.openDevTools()

	// con.connect(function(err) {
	// 	if (err) throw err;
	// 	else dialog.showMessageBox(null, options, (response, checkboxChecked) => {
	// 		console.log(response);
	// 		console.log(checkboxChecked);
	// 	});
	// });

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	app.quit()
})
