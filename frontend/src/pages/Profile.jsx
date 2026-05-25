import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await axios.get("/api/recipes");

        const myRecipes = res.data.filter(
          (recipe) => recipe.createdBy === user?._id
        );

        setRecipes(myRecipes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyRecipes();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Please login to view profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 transition-colors duration-300">
      
      {/* Profile Header */}
      <div className="mb-10 overflow-hidden rounded-3xl bg-white shadow-lg transition-colors duration-300 dark:bg-slate-900">
        
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500" />

        <div className="relative px-6 pb-6">
          
          {/* Avatar + User Info */}
          <div className="-mt-16 flex items-end gap-5">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-4xl font-bold text-white shadow-lg dark:border-slate-900">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <div className="pb-3">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {user.username}
              </h1>

              <p className="text-slate-500 dark:text-slate-300">
                {user.email}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            
            {/* Recipes Added */}
            <div className="rounded-2xl bg-orange-50 p-5 text-center transition-colors duration-300 dark:bg-slate-800">
              <h2 className="text-3xl font-bold text-orange-500">
                {recipes.length}
              </h2>

              <p className="mt-1 text-slate-600 dark:text-slate-300">
                Recipes Added
              </p>
            </div>

            {/* Breakfast */}
            <div className="rounded-2xl bg-pink-50 p-5 text-center transition-colors duration-300 dark:bg-slate-800">
              <h2 className="text-3xl font-bold text-pink-500">
                {recipes.filter((r) => r.category === "Breakfast").length}
              </h2>

              <p className="mt-1 text-slate-600 dark:text-slate-300">
                Breakfast Recipes
              </p>
            </div>

            {/* Dinner */}
            <div className="rounded-2xl bg-amber-50 p-5 text-center transition-colors duration-300 dark:bg-slate-800">
              <h2 className="text-3xl font-bold text-amber-500">
                {recipes.filter((r) => r.category === "Dinner").length}
              </h2>

              <p className="mt-1 text-slate-600 dark:text-slate-300">
                Dinner Recipes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Recipes Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Recipes
        </h2>

        <Link
          to="/add-recipe"
          className="rounded-full bg-orange-500 px-5 py-2 font-medium text-white shadow transition hover:bg-orange-600"
        >
          + Add Recipe
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-20 text-center">
          <p className="text-lg text-slate-500 dark:text-slate-300">
            Loading recipes...
          </p>
        </div>
      ) : recipes.length === 0 ? (

        /* Empty State */
        <div className="rounded-3xl bg-white p-10 text-center shadow transition-colors duration-300 dark:bg-slate-900">
          <p className="text-lg text-slate-500 dark:text-slate-300">
            No recipes added yet.
          </p>
        </div>

      ) : (

        /* Recipe Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe._id}
              to={`/recipe/${recipe._id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900"
            >
              
              {/* Image */}
              <div className="overflow-hidden">
                <img
                   src={
    recipe.photoUrl.startsWith("http")
      ? recipe.photoUrl
      : `${import.meta.env.VITE_API_URL}${recipe.photoUrl}`
  }
                  alt={recipe.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
                    {recipe.category}
                  </span>

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {recipe.cookingTime} mins
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-orange-500 dark:text-white">
                  {recipe.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;