import axios from "axios";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useEffect, useMemo, useState } from "react";
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
<<<<<<< HEAD

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(
        `/api/recipes/${
          category && category !== "All" ? `?category=${category}` : ""
        }`
      );
      console.log(res.data);
      setRecipes(res.data);
    };
    fetchRecipes();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-wrap gap-2 mt-2 mb-4">
        {categories.map((cat) => (
          <button
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            key={cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg duration-300 cursor-pointer"
            key={recipe._id}
          >
            {recipe.photoUrl && (
              <img
                src={recipe.photoUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold capitalize">
                {recipe.title}
              </h2>
              <p className="text-gray-600">{recipe.category}</p>
              <p className="text-gray-600">{recipe.cookingTime} minutes</p>
            </div>
          </Link>
        ))}
      </div>
=======
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `/api/recipes/${
            category && category !== "All" ? `?category=${encodeURIComponent(category)}` : ""
          }`
        );
        setRecipes(res.data);
      } catch {
        setError("Failed to load recipes. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return recipes;
    }

    return recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(normalizedSearch) ||
        recipe.category.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [recipes, search]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <section className="mb-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Discover your next meal idea</h2>
        <p className="mt-1 text-sm text-orange-50">Browse community recipes by category and cook time.</p>
      </section>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white text-slate-700 shadow hover:bg-slate-100"
              }`}
              key={cat}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or category"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm md:w-72"
        />
      </div>

      {error && <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="text-slate-500">Loading recipes...</p>
      ) : filteredRecipes.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-500 shadow">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe._id}`}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              key={recipe._id}
            >
              {recipe.photoUrl && (
                <img src={recipe.photoUrl} alt={recipe.title} className="h-48 w-full object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold capitalize text-slate-900">{recipe.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{recipe.category}</p>
                <p className="text-sm text-slate-500">{recipe.cookingTime} minutes</p>
              </div>
            </Link>
          ))}
        </div>
      )}
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
    </div>
  );
};

export default Home;
