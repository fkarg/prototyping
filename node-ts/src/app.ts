import express from "express";
import config from "config";

import log from "./logger";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  console.log(log);
  console.log(`Server listing at http://${host}:${port}`);
});

