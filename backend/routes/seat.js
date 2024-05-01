const router = require("express").Router();
const seatController = require("../controllers/seatController.js");

router.get("/map", seatController.getSeats);

module.exports = router;