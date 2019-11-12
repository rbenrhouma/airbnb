const express = require("express");
const router = express.Router();

router.post("/publish", async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const photo = req.body.photo;
    const price = req.body.price;
    const city = req.body.city;
    const loc = req.body.loc;

    if (title && description && photo && price && city && loc) {
      const room = new Room({
        title = title,
        description = description,
        photo = photo,
        price = price,
        city = city,
        loc = loc,
    });
      await room.save();
      res.json(room);
    } else {
      res.status(400).json({ error: "Wrong parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
    const id = req.query.id;
    try {
      const room = await Room.find(); 
      res.json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
