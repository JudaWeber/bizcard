const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bizcardsSchema = new Schema({
  bizName: { type: String, required: true },
  bizDescription: { type: String },
  bizAddress: { type: String, required: true },
  bizPhone: { type: String, required: true },
  bizImg: { type: String },
  ownerId: { type: String },
});

const Bizcards = mongoose.model("cards", bizcardsSchema);

const createNewBizCard = (
  bizName,
  bizDescription,
  bizAddress,
  bizPhone,
  bizImg,
  ownerId
) => {
  const bizcard = new Bizcards({
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImg,
    ownerId,
  });
  return bizcard.save();
};

const showAllBizcards = () => {
  return Bizcards.find({});
};

const showBizcardById = (id) => {
  return Bizcards.findById(id);
};

const updateBizcardById = (
  id,
  bizName,
  bizDescription,
  bizAddress,
  bizPhone,
  bizImg
) => {
  return Bizcards.findByIdAndUpdate(
    id,
    {
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
      bizImg,
    },
    { returnDocument: "after" }
  );
};

const deleteBizcardById = (id) => {
  return Bizcards.findByIdAndDelete(id);
};

module.exports = {
  createNewBizCard,
  showAllBizcards,
  showBizcardById,
  updateBizcardById,
  deleteBizcardById,
};
