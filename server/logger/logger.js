const pino = require('pino')

const logger = pino({
  prettyPrint: true,
  level: process.env.LOG_LEVEL || 'info'
})

module.exports = logger
