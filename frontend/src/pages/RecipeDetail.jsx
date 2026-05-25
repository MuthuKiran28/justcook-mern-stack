import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RecipeDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);

  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState("");

  // Fetch Recipe
  useEffect(() => {
    const fetchRecipe = async () => {
      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/recipes/${id}`
        );

        setRecipe(res.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Delete Recipe
  const handleDelete = async () => {
    try {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this recipe?"
        );

      if (!confirmDelete) return;

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Failed to delete recipe");
    }
  };

  // Add Comment
  const handleComment = async () => {
    try {

      if (!comment.trim()) return;

      const token =
        localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5000/api/recipes/${id}/comments`,
        {
          text: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecipe({
        ...recipe,
        comments: res.data,
      });

      setComment("");

    } catch (error) {

      console.error(error);

      alert("Failed to add comment");
    }
  };

  // Handle Rating
  const handleRating = async (value) => {
    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/recipes/${id}/rate`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh recipe
      const updated = await axios.get(
        `http://localhost:5000/api/recipes/${id}`
      );

      setRecipe(updated.data);

    } catch (error) {

      console.error(error);

      alert("Failed to rate recipe");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Loading recipe...
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg text-red-500">
          Recipe not found
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-900">

        {/* Recipe Image */}
        <img
          src={
            recipe.photoUrl.startsWith("http")
              ? recipe.photoUrl
              : `http://localhost:5000${recipe.photoUrl}`
          }
          alt={recipe.title}
          className="h-[400px] w-full object-cover"
        />

        <div className="p-8">

          {/* Category */}
          <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            {recipe.category}
          </span>

          {/* Title */}
          <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            {recipe.title}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">

            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() =>
                    handleRating(star)
                  }
                  className="text-3xl transition hover:scale-110"
                >
                  {star <=
                  Math.round(
                    recipe.averageRating || 0
                  )
                    ? "⭐"
                    : "☆"}
                </button>
              ))}
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {recipe.averageRating?.toFixed(1) ||
                "0.0"}{" "}
              Rating
            </p>
          </div>

          {/* Cooking Time */}
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            ⏱ {recipe.cookingTime} mins
          </p>

          {/* Ingredients */}
          <div className="mt-10">

            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
              Ingredients
            </h2>

            <ul className="space-y-3">
              {recipe.ingredients.map(
                (ingredient, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800 dark:text-slate-200"
                  >
                    🍴 {ingredient}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mt-10">

            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
              Instructions
            </h2>

            <p className="whitespace-pre-line leading-8 text-slate-700 dark:text-slate-300">
              {recipe.instructions}
            </p>
          </div>

          {/* Edit/Delete */}
          {user &&
            recipe.createdBy === user._id && (
              <div className="mt-10 flex gap-4">

                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
                >
                  Edit
                </Link>

                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}

          {/* Comments */}
          <div className="mt-14">

            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Comments 💬
            </h2>

            {/* Add Comment */}
            {user && (
              <div className="mb-8">

                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  placeholder="Write a comment..."
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <button
                  onClick={handleComment}
                  className="mt-4 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                >
                  Add Comment
                </button>
              </div>
            )}

            {/* Comment List */}
            <div className="space-y-4">

              {recipe.comments &&
              recipe.comments.length > 0 ? (
                recipe.comments.map(
                  (comment, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800"
                    >
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {comment.user}
                      </h3>

                      <p className="mt-2 text-slate-700 dark:text-slate-300">
                        {comment.text}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-slate-500 dark:text-slate-400">
                  No comments yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;