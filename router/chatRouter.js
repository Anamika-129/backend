const Model = require("../models/chatModel");
const router = require("express").Router();

router.post("/app", (req, res) => {
  new Model(req.body).save()
    .then(() => {
      console.log("user data saved from chat!");
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;