const express = require("express");
const bodyParser = require("body-parser");

const routesAPI = require("./api/routes");

const { PORT } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routesAPI);

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
