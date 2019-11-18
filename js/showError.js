const dialog = require('electron').remote.dialog

const showError = (msg) => {
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
