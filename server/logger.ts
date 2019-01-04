import * as pino from 'pino'

const logger = pino({
  prettyPrint: true,
  level: process.env.LOG_LEVEL || 'info'
})

export default logger
