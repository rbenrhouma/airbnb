const express = require("express");
const router = express.Router();

const Room = require("../models/Room");

router.post("/publish", async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const photos = req.body.photos;
    const price = req.body.price;
    const city = req.body.city;
    const loc = req.body.loc;
    const ratingValue = req.body.ratingValue;
    const review = req.body.review;
    if (title && description && photos && price && city && loc) {
      const room = new Room({
        title: title,
        description: description,
        photos: photos,
        price: price,
        city: city,
        loc: loc,
        ratingValue: ratingValue,
        review: review
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

const createFilters = req => {
  const filters = {};

  if (req.query.city) {
    filters.city = req.query.city;
  }
  return filters;
};

router.get("/", async (req, res) => {
  try {
    console.log(req);
    const filters = createFilters(req);

    const search = Room.find(filters);

    if (req.query.page) {
      const page = req.query.page;
      const limit = 2;
      search.limit(limit).skip(limit * page);
    }
    const rooms = await search;
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
