require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const csrf = require("csurf");
const helmet = require("helmet");
const cors = require("cors");

const countriesRouter = require("./routes/countries");
const csrfTokenRouter = require("./routes/csrfToken");
const statisticsRouter = require("./routes/statistics");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    })
);
app.use(cors({
    origin: "http://127.0.0.1", // 여기에 S3 경로
    credentials: true
}));

// Middleware
app.use(csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    },
    value: (req) => req.headers['x-csrf-token']
}));

// routers
app.use("/countries", countriesRouter);
app.use("/csrf-token", csrfTokenRouter);
app.use("/statistics", statisticsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({ error: "Not Found" });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    const message = err.message;
    const error = req.app.get("env") === "development" ? err : {};

    // return the error message as JSON
    res.status(err.status || 500);
    res.json({ error: message, details: error });
});

module.exports = app;

const serverless = require('serverless-http');
module.exports.handler = serverless(app);