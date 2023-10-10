require('dotenv').config()
const express = require('express');
require('winston-mongodb')
const { logger, morganLogger } = require('./logger');

const app = express();
const expressWinston = require('express-winston')

app.use(expressWinston.logger({
	winstonInstance: logger,
	statusLevels: true
}))

app.use(morganLogger);


app.get('/', (req, res) => {
	// console.log(req)
	logger.info(`User with token ${req.headers["authorization"] } accessed the home page.`);
	res.send('ok!');
});


app.listen(6001, () => {
	console.log('Server is running on port 6001');
});
