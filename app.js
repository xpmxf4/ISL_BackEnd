var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")

var app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// routers
app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({ error: "Not Found" })
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    var message = err.message
    var error = req.app.get("env") === "development" ? err : {}

    // return the error message as JSON
    res.status(err.status || 500)
    res.json({ error: message, details: error })
})

module.exports = app
