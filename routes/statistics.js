const express = require('express')
const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const app = express()

// mysql connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// wrap query execution with Promise
const executeQuery = query => {
    return new Promise((res, rej) => {
        db.query(query, (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows);
            }
        })
    })
}

// read query from sql file
const readQueryFromFile = fileName => {
    const filePath = path.join(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8');
}

router.get('/top5', async (req, res) => {
    try {
        const queryAll = readQueryFromFile('../sql/query_all.sql');
        const queryMonthly = readQueryFromFile('../sql/query_monthly.sql');
        const queryWeekly = readQueryFromFile('../sql/query_weekly.sql');
        const queryDaily = readQueryFromFile('../sql/query_daily.sql');

        const result = {};

        result.all = await executeQuery(queryAll);
        result.monthly = await executeQuery(queryMonthly);
        result.weekly = await executeQuery(queryWeekly);
        result.daily = await executeQuery(queryDaily);

        // cache deactivate
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');

        res.json(result);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

module.exports = router;