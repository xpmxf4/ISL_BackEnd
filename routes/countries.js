const express = require("express")
const mysql = require("mysql2")
const router = express.Router()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


router.post("/", function (req, res, next) {
    const to_country = req.body.toCountry;
    if (to_country.length !== 2) {
        return res.status(400).json({
            error: "Invalid country code",
        })
    }

    const query = "INSERT INTO isl (to_country, date) VALUES  (?, now())"
    db.query(query, [to_country], function (err, result) {
        if (err) {
            return res.status(500).json({
                error: "Database error",
            })
        }
        res.json({
            "status": "successfully delivered"
        })
    })
})

module.exports = router