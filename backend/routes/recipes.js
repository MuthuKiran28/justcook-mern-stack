import express from "express";
import Recipe from "../models/Recipe.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

const ALLOWED_CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
];

// Normalize Recipe Input
const normalizeRecipeInput = (body = {}) => {
  const title =
    typeof body.title === "string"
      ? body.title.trim()
      : "";

  const instructions =
    typeof body.instructions === "string"
      ? body.instructions.trim()
      : "";

  const category =
    typeof body.category === "string"
      ? body.category.trim()
      : "";

  const cookingTime = Number(body.cookingTime);

  let ingredients = [];

  if (typeof body.ingredients === "string") {
    try {
      ingredients = JSON.parse(body.ingredients);
    } catch {
      ingredients = [];
    }
  } else if (Array.isArray(body.ingredients)) {
    ingredients = body.ingredients;
  }

  ingredients = ingredients
    .map((ingredient) =>
      typeof ingredient === "string"
        ? ingredient.trim()
        : ""
    )
    .filter(Boolean);

  return {
    title,
    ingredients,
    instructions,
    category,
    cookingTime,
  };
};

// Validate Recipe
const validateRecipe = ({
  title,
  ingredients,
  instructions,
  category,
  cookingTime,
}) => {
  if (
    !title ||
    !instructions ||
    !category ||
    !Number.isFinite(cookingTime)
  ) {
    return "Please fill all fields";
  }

  if (!ingredients.length) {
    return "Please add at least one ingredient";
  }

  if (!ALLOWED_CATEGORIES.includes(category)) {
    return "Invalid recipe category";
  }

  if (cookingTime <= 0 || cookingTime > 720) {
    return "Cooking time must be between 1 and 720 minutes";
  }

  return null;
};

// CREATE RECIPE
router.post(
  "/",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image",
        });
      }

      const recipeInput = normalizeRecipeInput(req.body);

      const validationMessage =
        validateRecipe(recipeInput);

      if (validationMessage) {
        return res.status(400).json({
          message: validationMessage,
        });
      }

      const recipe = await Recipe.create({
        ...recipeInput,

        photoUrl:
          "/uploads/" + req.file.filename,

        createdBy: req.user._id,
      });

      return res.status(201).json(recipe);

    } catch (err) {

      console.error("CREATE RECIPE ERROR:");
      console.error(err);

      return res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }
);

// GET ALL RECIPES
router.get("/", async (req, res) => {
  try {

    const { category } = req.query;

    const query =
      category &&
      ALLOWED_CATEGORIES.includes(category)
        ? { category }
        : {};

    const recipes = await Recipe.find(query)
      .sort({ createdAt: -1 });

    return res.json(recipes);

  } catch (error) {

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// GET SINGLE RECIPE
router.get("/:id", async (req, res) => {
  try {

    const recipe = await Recipe.findById(
      req.params.id
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    return res.json(recipe);

  } catch (err) {

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// UPDATE RECIPE
router.put("/:id", protect, async (req, res) => {
  try {

    const recipeInput =
      normalizeRecipeInput(req.body);

    const recipe = await Recipe.findById(
      req.params.id
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    if (
      recipe.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const validationMessage =
      validateRecipe(recipeInput);

    if (validationMessage) {
      return res.status(400).json({
        message: validationMessage,
      });
    }

    recipe.title = recipeInput.title;
    recipe.ingredients =
      recipeInput.ingredients;
    recipe.instructions =
      recipeInput.instructions;
    recipe.category =
      recipeInput.category;
    recipe.cookingTime =
      recipeInput.cookingTime;

    await recipe.save();

    return res.json(recipe);

  } catch (err) {

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// DELETE RECIPE
router.delete("/:id", protect, async (req, res) => {
  try {

    const recipe = await Recipe.findById(
      req.params.id
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    if (
      recipe.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await recipe.deleteOne();

    return res.json({
      message: "Recipe deleted",
    });

  } catch (err) {

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ADD COMMENT
router.post(
  "/:id/comments",
  protect,
  async (req, res) => {
    try {

      const recipe =
        await Recipe.findById(req.params.id);

      if (!recipe) {
        return res.status(404).json({
          message: "Recipe not found",
        });
      }

      const newComment = {
        user: req.user.username,
        text: req.body.text,
      };

      recipe.comments.push(newComment);

      await recipe.save();

      return res.json(recipe.comments);

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ADD RATING
router.post(
  "/:id/rate",
  protect,
  async (req, res) => {
    try {

      const { value } = req.body;

      if (
        !value ||
        value < 1 ||
        value > 5
      ) {
        return res.status(400).json({
          message:
            "Rating must be between 1 and 5",
        });
      }

      const recipe =
        await Recipe.findById(req.params.id);

      if (!recipe) {
        return res.status(404).json({
          message: "Recipe not found",
        });
      }

      // IMPORTANT FIX
      if (!recipe.ratings) {
        recipe.ratings = [];
      }

      // Check existing rating
      const existingRating =
        recipe.ratings.find(
          (rating) =>
            rating.user.toString() ===
            req.user._id.toString()
        );

      if (existingRating) {

        existingRating.value = value;

      } else {

        recipe.ratings.push({
          user: req.user._id,
          value,
        });
      }

      // Calculate average
      const total =
        recipe.ratings.reduce(
          (sum, rating) =>
            sum + rating.value,
          0
        );

      recipe.averageRating =
        total / recipe.ratings.length;

      await recipe.save();

      return res.json({
        averageRating:
          recipe.averageRating,

        ratings:
          recipe.ratings.length,
      });

    } catch (error) {

      console.error("RATING ERROR:");
      console.error(error);

      return res.status(500).json({
        message:
          error.message || "Server error",
      });
    }
  }
);  

export default router;