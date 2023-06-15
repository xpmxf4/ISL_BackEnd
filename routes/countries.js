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
    console.log("POST / route handler called");
    console.log(req.body);

    const from_country = req.body.fromCountry;
    const to_country = req.body.toCountry;

    if (from_country.length !== 2 || to_country.length !== 2) {
        return res.status(400).json({
            error: "Invalid country code",
        })
    }

    const query = "INSERT INTO isl (from_country, to_country) VALUES (?, ?)"
    db.query(query, [from_country, to_country], function (err, result) {
        if (err) {
            return res.status(500).json({
                error: "Database error",
            })
        }


    })
    res.json({
        message: "Data Received",
        from_country: from_country,
        to_country: to_country,
    })
})

module.exports = router