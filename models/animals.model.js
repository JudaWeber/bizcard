const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalsSchema = new Schema({
  animalName: { type: String, requierd: true },
  animalColor: { type: String, requierd: true },
  animalAge: { type: Number, requierd: true },
});

const Animals = mongoose.model("animals", animalsSchema);

const createNewAnimal = (animalName, animalColor, animalAge) => {
  const animal = new Animals({
    animalName,
    animalColor,
    animalAge,
  });
  return animal.save();
};

const showAllAnimals = () => {
  return Animals.find({});
};

const updateAnimalById = (id, animalName, animalColor, animalAge) => {
  return Animals.findByIdAndUpdate(
    id,
    { animalName, animalColor, animalAge },
    { returnDocument: "after" }
  );
};
const deleteAnimalById = (id) => {
  return Animals.findByIdAndDelete(id);
};

module.exports = {
  createNewAnimal,
  showAllAnimals,
  updateAnimalById,
  deleteAnimalById,
};
