import express from "express";
import Recipe from "../models/Recipe.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

//
// GET ALL RECIPES
//
router.get("/", async (req, res) => {
  try {

    const category = req.query.category;

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    const recipes = await Recipe.find(filter)
      .populate(
        "createdBy",
        "username email"
      )
      .sort({
        createdAt: -1,
      });

    res.json(recipes);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch recipes",
    });
  }
});

//
// GET SINGLE RECIPE
//
router.get("/:id", async (req, res) => {
  try {

    const recipe =
      await Recipe.findById(
        req.params.id
      ).populate(
        "createdBy",
        "username email"
      );

    if (!recipe) {
      return res.status(404).json({
        message:
          "Recipe not found",
      });
    }

    res.json(recipe);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch recipe",
    });
  }
});

//
// CREATE RECIPE
//
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {

      const {
        title,
        ingredients,
        instructions,
        category,
        cookingTime,
      } = req.body;

      let parsedIngredients = [];

      if (ingredients) {

        parsedIngredients =
          JSON.parse(ingredients);
      }

      const photoUrl = req.file
        ? `/uploads/${req.file.filename}`
        : "";

      const recipe =
        await Recipe.create({
          title,
          ingredients:
            parsedIngredients,
          instructions,
          category,
          cookingTime,
          photoUrl,
          createdBy:
            req.user.id,
        });

      res.status(201).json(recipe);

    } catch (error) {

      console.error(
        "Create Recipe Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to create recipe",
      });
    }
  }
);

//
// GET USER RECIPES
//
router.get(
  "/user/my-recipes",
  authMiddleware,
  async (req, res) => {
    try {

      const recipes =
        await Recipe.find({
          createdBy: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(recipes);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch user recipes",
      });
    }
  }
);

//
// DELETE RECIPE
//
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const recipe =
        await Recipe.findById(
          req.params.id
        );

      if (!recipe) {
        return res.status(404).json({
          message:
            "Recipe not found",
        });
      }

      if (
        recipe.createdBy.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message:
            "Unauthorized",
        });
      }

      await recipe.deleteOne();

      res.json({
        message:
          "Recipe deleted",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete recipe",
      });
    }
  }
);

export default router;