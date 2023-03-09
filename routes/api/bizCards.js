const express = require("express");
const router = express.Router();
const {
  validateNewBizSchema,
  validateUpdateBizSchema,
  validateDeleteBizSchema,
  validateFindByIdBizSchema,
} = require("../../validation/biz.validation");
const {
  createNewBizCard,
  showAllBizcards,
  showBizcardById,
  updateBizcardById,
  deleteBizcardById,
} = require("../../models/bizcards.model");
const authMiddleware = require("../../middleware/auth.middleware");
const allowModifyMiddleware = require("../../middleware/allowModify.middleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateNewBizSchema(req.body);
    const userData = await createNewBizCard(
      validatedValue.bizName,
      validatedValue.bizDescription,
      validatedValue.bizAddress,
      validatedValue.bizPhone,
      validatedValue.bizImg,
      req.userData.id
    );
    res.json({ msg: "card created", userData }).status(201);
  } catch (error) {
    res.status(400).json({ error: error });
    console.log("error", error);
    console.log("req.body", req.body);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCards = await showAllBizcards();
    res.json(allCards).status(200);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/getcardbyid/:id", async (req, res) => {
  try {
    const validatedValue = await validateFindByIdBizSchema(req.params);
    const bizCardData = await showBizcardById(validatedValue.id);
    res.json(bizCardData).status(200);
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error);
  }
});

router.patch("/", authMiddleware, allowModifyMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateUpdateBizSchema(req.body);
    const bizCardData = await showBizcardById(validatedValue.id);
    if (!bizCardData) throw "card not exists";
    if (bizCardData.ownerId === req.userData.id || req.userData.allowAccess) {
      await updateBizcardById(
        validatedValue.id,
        validatedValue.bizName,
        validatedValue.bizDescription,
        validatedValue.bizAddress,
        validatedValue.bizPhone,
        validatedValue.bizImg
      );
    } else {
      throw "operation invalid aka unauthorized";
    }
    res.json({ msg: "bizcard updated" });
  } catch (err) {
    res.status(400).json({ error: err });
    console.log(err);
  }
});

router.delete(
  "/:id",
  authMiddleware,
  allowModifyMiddleware,
  async (req, res) => {
    try {
      const validatedValue = await validateDeleteBizSchema(req.params);
      const bizCardData = await showBizcardById(validatedValue.id);
      if (!bizCardData) throw "card not exists";
      if (bizCardData.ownerId === req.userData.id || req.userData.allowAccess) {
        await deleteBizcardById(validatedValue.id);
      }
      res.status(200).json({ msg: "card deleted" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

module.exports = router;
