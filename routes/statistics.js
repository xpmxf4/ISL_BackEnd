const express = require('express')
const mysql = require('mysql2')
const fs = require('fs')
const router = express.Router()

const app = express()

const [host, user, password, database] = fs
    .readFileSync('database_config.txt', 'utf-8')
    .split('\n')
    .map(line => line.replace('\r', ''))

// mysql connection
const db = mysql.createConnection({
    host, user, password, database
})


router.get('/top5', () => {
    const queryAll = `SELECT to_country, COUNT(*) AS count FROM isl GROUP BY to_country ORDER BY count DESC LIMIT 5`;
    const queryMonthly = `SELECT to_country, COUNT(*) AS count, MONTH(date) AS month, YEAR(date) AS year FROM isl WHERE date >= DATE_SUB(NOW(), INTERVAL 1 MONTH) GROUP BY to_country, month, year ORDER BY count DESC LIMIT 5`;
    const queryWeekly = `SELECT to_country, COUNT(*) AS count, WEEK(date) AS week, YEAR(date) AS year FROM isl WHERE date >= DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY to_country, week, year ORDER BY count DESC LIMIT 5`;
    const queryDaily = `SELECT to_country, COUNT(*) AS count, DATE(date) AS date FROM isl WHERE DATE(date) = CURDATE() GROUP BY to_country, date ORDER BY count DESC LIMIT 5`;

    const result = {};

    db.query(queryAll, (err, rows) => {
        if (err) {
            console.log('error executing query : ', err);
            result.all = []
        } else {
            result.all = rows;
        }
    })

    db.query(queryMonthly, (err, rows) => {
        if (err) {
            console.log('error executing query : ', err);
            result.monthly = []
        } else {
            result.monthly = rows;
        }
    })

    db.query(queryWeekly, (err, rows) => {
        if (err) {
            console.log('error executing query : ', err);
            result.weekly = []
        } else {
            result.weekly = rows;
        }
    })

    db.query(queryDaily, (err, rows) => {
        if (err) {
            console.log('error executing query : ', err);
            result.daily = []
        } else {
            result.daily = rows;
        }
    })

    res.json(result);
})

module.exprots = router;