const winston = require('winston');
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, metadata, prettyPrint, errors } = format;
// require('winston-mongodb')
const morgan = require('morgan');


const logger = createLogger({
	// format: combine(
	// 	timestamp({
	// 		format: 'YYYY-MM-DD hh:mm:ss.SSS A',
	// 	}),
	// 	json()
	// ),
	// format: combine(timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }), json(), metadata(), prettyPrint()),
	format: combine(timestamp(), json(), metadata(), prettyPrint()),
	transports: [
		new transports.File({ filename: 'error.log', level: 'error' }),
		new transports.File({ filename: 'combined.log' }),
		new transports.MongoDB({
			db: process.env.MONGODB_URI,
			options: { useNewUrlParser: true, useUnifiedTopology: true },
			collection: 'logs',
		})
	]
});

const stream = {
	write: (message) => {
		logger.info(message.trim());
	}
};

const morganLogger = morgan('combined', { stream });

module.exports = { logger, morganLogger };
