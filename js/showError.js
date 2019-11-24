
const showError = (msg) => {
	const dialog = require('electron').remote.dialog

	dialog.showMessageBox(null, {
		type: 'error',
		buttons: ['OK'],
		defaultId: 2,
		title: '',
		message: 'Error',
		detail: msg.toString()
	}, (res) => console.log(res))
}

module.exports = showError;
