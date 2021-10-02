export default {
  port: 1337,
  host: "localhost",
  // dbUri: "mongodb://root:example@localhost:27017/rest-api",
  dbUri: "mongodb://localhost:27017/test",
  db: {
      user: 'user',
      pass: 'abcd',
  },
  saltWorkFactor: 13,

  /**
   * Used by winston logger
   */
  logs: {
      level: process.env.LOG_LEVEL || 'silly',
  },

}
