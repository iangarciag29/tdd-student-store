const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { NotFoundError } = require("./utils/errors");

app.use(morgan("tiny"))
app.use(express.json());

app.use(
    cors()
);

app.get("/", (_req, res) => {
    res.status(200).json({
        ping: "pong"
    })
})

// Routes
app.use("/store", require("./routes/store.routes"));
app.use("/orders", require("./routes/order.routes"));

// Error handlers
app.use((req, res, next) => {
    return next(new NotFoundError());
});

app.use((error, req, res) => {
    const status = error.status || 500;
    const message = error.message || "Something wen't wrong in the application";

    return res.status(status).json({
        error: {
            status,
            message
        }
    });
});

module.exports = app;
