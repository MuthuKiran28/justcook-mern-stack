import express from "express";
import Recipe from "../models/Recipe.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const ALLOWED_CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

const normalizeRecipeInput = (body = {}) => {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const instructions =
    typeof body.instructions === "string" ? body.instructions.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const photoUrl = typeof body.photoUrl === "string" ? body.photoUrl.trim() : "";
  const cookingTime = Number(body.cookingTime);
  const ingredients = Array.isArray(body.ingredients)
    ? body.ingredients
        .map((ingredient) => (typeof ingredient === "string" ? ingredient.trim() : ""))
        .filter(Boolean)
    : [];

  return { title, ingredients, instructions, category, photoUrl, cookingTime };
};

const validateRecipe = ({ title, ingredients, instructions, category, photoUrl, cookingTime }) => {
  if (!title || !instructions || !category || !photoUrl || !Number.isFinite(cookingTime)) {
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

// Create recipe
router.post("/", protect, async (req, res) => {
  const recipeInput = normalizeRecipeInput(req.body);

  try {
    const validationMessage = validateRecipe(recipeInput);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const recipe = await Recipe.create({
      ...recipeInput,
      createdBy: req.user._id,
    });
    return res.status(201).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Get recipes
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const normalizedCategory = typeof category === "string" ? category.trim() : "";
    const query = normalizedCategory && ALLOWED_CATEGORIES.includes(normalizedCategory)
      ? { category: normalizedCategory }
      : {};
    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    return res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Get a recipe
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Update a recipe
router.put("/:id", protect, async (req, res) => {
  const recipeInput = normalizeRecipeInput(req.body);

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const validationMessage = validateRecipe(recipeInput);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    recipe.title = recipeInput.title;
    recipe.ingredients = recipeInput.ingredients;
    recipe.instructions = recipeInput.instructions;
    recipe.category = recipeInput.category;
    recipe.photoUrl = recipeInput.photoUrl;
    recipe.cookingTime = recipeInput.cookingTime;

    const updatedRecipe = await recipe.save();
    return res.json(updatedRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Delete a recipe
router.delete("/:id", protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await recipe.deleteOne();
    return res.json({ message: "Recipe deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
