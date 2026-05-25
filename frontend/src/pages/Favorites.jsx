import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecipes(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Remove Favorite
  const removeFavorite = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/auth/favorites/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Loading favorites...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 transition-colors duration-300">
      
      {/* Title */}
      <h1 className="mb-8 text-4xl font-bold text-slate-900 dark:text-white">
        Favorite Recipes ❤️
      </h1>

      {/* Empty State */}
      {recipes.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow transition-colors duration-300 dark:bg-slate-900">
          <p className="text-lg text-slate-500 dark:text-slate-300">
            No favorite recipes yet.
          </p>
        </div>
      ) : (

        /* Recipe Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900"
            >
              
              {/* Remove Favorite Button */}
              <button
                onClick={() => removeFavorite(recipe._id)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition hover:scale-110 dark:bg-slate-800/90"
              >
                ❌
              </button>

              <Link to={`/recipe/${recipe._id}`}>
                
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={recipe.photoUrl}
                    alt={recipe.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  
                  {/* Top Info */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
                      {recipe.category}
                    </span>

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {recipe.cookingTime} mins
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-slate-900 transition group-hover:text-orange-500 dark:text-white">
                    {recipe.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                    {recipe.instructions}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 text-sm font-medium text-orange-500">
                    View Recipe →
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;