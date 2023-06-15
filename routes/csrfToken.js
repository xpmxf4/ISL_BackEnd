const express = require("express")
const router = express.Router()
require("dotenv").config();

router.get("/", function (req, res, next) {
    const csrfToken = req.csrfToken();
    res.json({ csrfToken: csrfToken })
})

module.exports = router