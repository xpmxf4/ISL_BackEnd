var express = require("express")
var router = express.Router()

router.get("/", function (req, res, next) {
    res.json({
        csrfToken: req.csrfToken(),
    })
})

module.exports = router