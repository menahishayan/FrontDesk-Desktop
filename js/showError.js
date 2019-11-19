
const showError = (msg) => {
	const dialog = require('electron').remote.dialog
	
	dialog.showMessageBox(null, {
		type: 'error',
		buttons: ['OK'],
		defaultId: 2,
		title: 'Error',
		message: 'Query Error',
		detail: msg.toString()
	}, (res) => console.log(res))
}

module.exports = showError;
