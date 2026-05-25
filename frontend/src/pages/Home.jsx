import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  // Fetch Recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/recipes${
            category !== "All"
              ? `?category=${encodeURIComponent(category)}`
              : ""
          }`
        );

        setRecipes(res.data);

      } catch (err) {

        console.error(err);

        setError("Failed to load recipes");

      } finally {

        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  // Search Filter
  const filteredRecipes = useMemo(() => {
    const query = search.toLowerCase();

    return recipes.filter(
      (recipe) =>
        recipe.title
          .toLowerCase()
          .includes(query) ||
        recipe.category
          .toLowerCase()
          .includes(query)
    );
  }, [recipes, search]);

  // Add Favorite
  const handleFavorite = async (recipeId) => {
    try {

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/favorites/${recipeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to favorites ❤️");

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 transition-colors duration-300">

      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <div className="mb-8 mt-10 flex flex-wrap gap-3">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setCategory(cat)
            }
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              category === cat
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-slate-700 shadow hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-10">
        <input
          type="search"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-800 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-8 rounded-2xl bg-red-100 px-5 py-4 text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <p className="text-lg text-slate-500 dark:text-slate-300">
            Loading recipes...
          </p>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-slate-500 dark:text-slate-400">
            No recipes found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe._id}
              to={`/recipe/${recipe._id}`}
              className="group relative overflow-hidden rounded-[2rem]
              border border-slate-200 bg-white shadow-md
              transition-all duration-500 hover:-translate-y-2
              hover:shadow-2xl dark:border-slate-800
              dark:bg-slate-900"
            >

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFavorite(recipe._id);
                }}
                className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur transition hover:scale-110 dark:bg-slate-800/90"
              >
                ❤️
              </button>

              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={
                    recipe.photoUrl.startsWith(
                      "http"
                    )
                      ? recipe.photoUrl
                      : `${import.meta.env.VITE_API_URL}${recipe.photoUrl}`
                  }
                  alt={recipe.title}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-orange-500 shadow-lg backdrop-blur dark:bg-slate-800/90">
                  ⭐{" "}
                  {recipe.averageRating?.toFixed(
                    1
                  ) || "4.8"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">

                {/* Top */}
                <div className="mb-3 flex items-center justify-between">

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
                    {recipe.category}
                  </span>

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    ⏱ {recipe.cookingTime} mins
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 transition group-hover:text-orange-500 dark:text-white">
                  {recipe.title}
                </h2>

                {/* Description */}
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {recipe.instructions}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">

                  <div className="text-sm font-semibold text-orange-500">
                    View Recipe →
                  </div>

                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    Premium Recipe
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;