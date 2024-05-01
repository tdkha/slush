const router = require("express").Router();
const seatController = require("../controllers/seatController.js");
const validate = require("../middlewares/validate.js")

router.use(validate);

router.get("/map", seatController.getSeats);

module.exports = router;