const express = require("express");
const router = express.Router();

router.get("/categories", (req, resp, next) => {
    resp.send("Acknowledged get categories.");
});

module.exports = router;