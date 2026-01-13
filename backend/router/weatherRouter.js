const {
  postWeather,
  getWeather,
  deleteWeather,
} = require("../controller/weatherEntryController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/", authMiddleware, postWeather);
router.get("/", authMiddleware, getWeather);
router.delete("/", authMiddleware, deleteWeather);

module.exports = router;
