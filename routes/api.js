const express = require("express");
const router = express.Router();
const bizCardsRouter = require("./api/bizCards");
const animalsRouter = require("./api/animals");
const authRouter = require("./api/auth");

router.get("/newuser", (req, res) => {
  res.json({ msg: "ok" });
});

router.use("/bizcards", bizCardsRouter);
router.use("/animals", animalsRouter);
router.use("/auth", authRouter);

module.exports = router;
