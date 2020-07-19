var fs = require('fs');
var path = require('path');

const getDb = () => {
	const db = fs.readFileSync('./db.json');
	return JSON.parse(db);
}

const setDb = (collection, values) => {
	const db = JSON.parse(fs.readFileSync('./db.json'));
	db[collection] = values;
	fs.writeFileSync('./db.json', JSON.stringify(db));
}

module.exports = {
	getDb,
	setDb
}