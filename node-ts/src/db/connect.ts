import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
  const dbUri = config.get("dbUri") as string;

  return mongoose
    .connect(dbUri, {
        user: config.get("db.user") as string,
        pass: config.get("db.pass") as string,
        // user: 'user',
        // pass: 'abcd',
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      console.log(error);
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;

