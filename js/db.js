var mysql = require('mysql');

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "frontdesk"
});

module.exports = db;
