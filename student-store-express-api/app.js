const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.status(200).send({
        "ping": "pong"
    });
});

app.use((error, req, res, next) => {
    const {status, message} = error;
    const errorObj = {
        status: status || 500,
        message: message || "Something went wrong with the application."
    }
    res.status(status).send({
        error: errorObj
    });
});

module.exports = app;