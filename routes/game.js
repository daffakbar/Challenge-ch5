var express = require("express");
var router = express.Router();

const imgGame = [
  "/images/assets/img/batu.png",
  "/images/assets/img/kertas.png",
  "/images/assets/img/gunting.png",
];
/* GET game page. */
router.get("/", function (req, res, next) {
  res.render("game", { title: "Game Suit", imgGame });
});

module.exports = router;
