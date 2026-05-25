import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    category: "",
    photoUrl: "",
    cookingTime: "",
  });

  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    handleInputChange("ingredients", newIngredients);
  };

  const addIngredient = () => {
    const lastIngredient =
      formData.ingredients[formData.ingredients.length - 1];

    if (lastIngredient.trim() === "") {
      setError("Please fill in the last ingredient before adding a new one");
      return;
    }

    setError("");
    handleInputChange("ingredients", [...formData.ingredients, ""]);
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length === 1) return;

    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    handleInputChange("ingredients", newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.put(`/api/recipes/${id}`, {
        title: formData.title,
        ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
        instructions: formData.instructions,
        category: formData.category,
        photoUrl: formData.photoUrl,
        cookingTime: formData.cookingTime
          ? Number(formData.cookingTime)
          : undefined,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to update recipe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);

        setFormData({
          title: res.data.title,
          ingredients: res.data.ingredients,
          instructions: res.data.instructions,
          category: res.data.category,
          photoUrl: res.data.photoUrl,
          cookingTime: res.data.cookingTime,
        });
      } catch (err) {
        setError("Failed to load recipe");
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700">Ingredients</label>

          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, e.target.value)
                }
                className="w-full p-2 border rounded"
                placeholder={`Ingredient ${index + 1}`}
                required
              />

              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="text-blue-500 hover:underline"
          >
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700">Instructions</label>
          <textarea
            value={formData.instructions}
            onChange={(e) =>
              handleInputChange("instructions", e.target.value)
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        {/* Cooking Time */}
        <div>
          <label className="block text-gray-700">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            value={formData.cookingTime}
            onChange={(e) =>
              handleInputChange("cookingTime", e.target.value)
            }
            className="w-full p-2 border rounded"
            required
            min={1}
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-gray-700">Photo URL</label>
          <input
            type="text"
            value={formData.photoUrl}
            onChange={(e) =>
              handleInputChange("photoUrl", e.target.value)
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit */}
        <button
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
          type="submit"
        >
          {loading ? "Updating..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;