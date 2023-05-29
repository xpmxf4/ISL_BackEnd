const express = require("express")
const router = express.Router()

router.post("/", function (req, res) {
    const from_country = req.body.from_country
    const to_country = req.body.to_country

    // 올바른 데이터를 받았는지 확인하는 로직
    // DB 에 저장하는 작업

    res.json({
        message: "Data Received",
        from_country: from_country,
        to_country: to_country,
    })
})