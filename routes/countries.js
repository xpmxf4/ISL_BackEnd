const express = require("express")
const mysql = require("mysql2")
const fs = require("fs")
const router = express.Router()

const [host, user, password, database] = fs
    .readFileSync("database_config.txt", "utf8")
    .split("\n")
    .map((line) => line.replace("\r", ""))


const db = mysql.createConnection({
    host,
    user,
    password,
    database,
})

router.post("", function (req, res) {
    const from_country = req.body.from_country
    const to_country = req.body.to_country

    if (from_country.length !== 2 || to_country.length !== 2) {
        return res.status(400).json({
            error: "Invalid country code",
        })
    }

    const query = "INSERT INTO isl (from_country, to_country) VALUES (?, ?)"
    db.query(query, [from_country, to_country], function (err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: "Database error",
            })
        }

        res.json({
            message: "Data Received",
            from_country: from_country,
            to_country: to_country,
        })
    })
})

module.exports = router