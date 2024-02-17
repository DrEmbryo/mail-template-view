import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

ejs.openDelimiter = "{";
ejs.closeDelimiter = "}";

import { mainRouter } from "./modules/main";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT } = process.env;

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
