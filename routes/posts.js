const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
  Post.find({})
    .then((data) => {
      res.json(data);

      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/save", (req, res) => {
  console.log("Body: ", req.body);
  const data = req.body;

  const newPost = new Post(data);

  newPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry! An error occoured on the server." });
      return;
    }
    return res.status(200).json({ msg: "Data has been saved on the server" });
  });
});

module.exports = router;
