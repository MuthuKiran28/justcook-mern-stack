import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Add Ingredient
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  // Update Ingredient
  const updateIngredient = (index, value) => {
    const updated = [...ingredients];

    updated[index] = value;

    setIngredients(updated);
  };

  // Remove Ingredient
  const removeIngredient = (index) => {
    const updated = ingredients.filter(
      (_, i) => i !== index
    );

    setIngredients(updated);
  };

  // Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);

      formData.append(
        "ingredients",
        JSON.stringify(
          ingredients.filter((item) => item.trim() !== "")
        )
      );

      formData.append(
        "instructions",
        instructions
      );

      formData.append("category", category);

      formData.append(
        "cookingTime",
        cookingTime
      );

      formData.append("image", image);

      await axios.post(
          `${import.meta.env.VITE_API_URL}/api/recipes`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add recipe"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      
      <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
        
        <h1 className="mb-8 text-4xl font-bold text-slate-900 dark:text-white">
          Add Recipe 🍽
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          
          {/* Title */}
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Recipe Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Ingredients
            </label>

            <div className="space-y-3">
              {ingredients.map(
                (ingredient, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) =>
                        updateIngredient(
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder={`Ingredient ${
                        index + 1
                      }`}
                      required
                    />

                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeIngredient(index)
                        }
                        className="rounded-xl bg-red-500 px-4 text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )
              )}
            </div>

            <button
              type="button"
              onClick={addIngredient}
              className="mt-4 rounded-xl bg-orange-500 px-5 py-2 font-medium text-white"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Instructions
            </label>

            <textarea
              rows={6}
              value={instructions}
              onChange={(e) =>
                setInstructions(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            >
              <option value="">
                Select Category
              </option>

              <option value="Breakfast">
                Breakfast
              </option>

              <option value="Lunch">
                Lunch
              </option>

              <option value="Dinner">
                Dinner
              </option>

              <option value="Dessert">
                Dessert
              </option>

              <option value="Snack">
                Snack
              </option>
            </select>
          </div>

          {/* Cooking Time */}
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Cooking Time (mins)
            </label>

            <input
              type="number"
              value={cookingTime}
              onChange={(e) =>
                setCookingTime(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-64 w-full rounded-2xl object-cover"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-semibold text-white hover:bg-orange-600"
          >
            {loading
              ? "Uploading..."
              : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;