export default {
  port: 1337,
  host: "localhost",
  dbUri: "mongodb://localhost:27017/rest-api",
  saltWorkFactor: 13,

  /**
   * Used by winston logger
   */
  logs: {
      level: process.env.LOG_LEVEL || 'silly',
  },

}
