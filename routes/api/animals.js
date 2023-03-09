const express = require("express");
const router = express.Router();
const {
  createNewAnimal,
  showAllAnimals,
  updateAnimalById,
  deleteAnimalById,
} = require("../../models/animals.model");

router.post("/", async (req, res) => {
  try {
    const myAnimal = await createNewAnimal(
      req.body.animalName,
      req.body.animalColor,
      req.body.animalAge
    );
    res.json(myAnimal).status(201);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allAnimals = await showAllAnimals();
    res.status(200).json({ allAnimals: allAnimals });
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedAnimal = await updateAnimalById(
      req.body.id,
      req.body.animalName,
      req.body.animalColor,
      req.body.animalAge
    );
    res.json({ updatedAnimal: updatedAnimal }).status(200);
  } catch (error) {
    console.log(errpr);
    res.json({ error: error });
  }
});

router.delete("/", async (req, res) => {
  try {
    await deleteAnimalById(req.body.id);
    res.json({ msg: "successfully deletes" }).status(200);
  } catch (error) {
    console.log(errpr);
    res.json({ error: error });
  }
});

module.exports = router;
