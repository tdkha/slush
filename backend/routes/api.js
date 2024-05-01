const router = require("express").Router();

const authRoute = require("./auth.js");
const seatRoute = require("./seat.js");;

router.use("/auth", authRoute);
router.use("/seat", seatRoute);

module.exports = router;