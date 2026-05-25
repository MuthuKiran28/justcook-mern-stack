import axios from "axios";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Profile = () => {

  const { user } =
    useContext(AuthContext);

  const [recipes, setRecipes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchRecipes =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await axios.get(
              `${import.meta.env.VITE_API_URL}/api/recipes/user/my-recipes`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
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

    fetchRecipes();

  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      {/* PROFILE CARD */}
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl dark:bg-slate-900">

        {/* Cover */}
        <div className="h-52 bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400"></div>

        {/* User Info */}
        <div className="relative px-8 pb-8">

          <div className="absolute -top-16 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-5xl font-bold text-white shadow-xl dark:border-slate-900">
            {user?.username
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div className="pt-20">

            <h1 className="text-4xl font-black text-slate-900 dark:text-white">
              {user?.username}
            </h1>

            <p className="mt-2 text-lg text-slate-500 dark:text-slate-300">
              {user?.email}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-orange-50 p-8 text-center dark:bg-orange-500/10">
              <h2 className="text-5xl font-black text-orange-500">
                {recipes.length}
              </h2>

              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Recipes Added
              </p>
            </div>

            <div className="rounded-3xl bg-pink-50 p-8 text-center dark:bg-pink-500/10">
              <h2 className="text-5xl font-black text-pink-500">
                {
                  recipes.filter(
                    (r) =>
                      r.category ===
                      "Breakfast"
                  ).length
                }
              </h2>

              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Breakfast Recipes
              </p>
            </div>

            <div className="rounded-3xl bg-yellow-50 p-8 text-center dark:bg-yellow-500/10">
              <h2 className="text-5xl font-black text-yellow-500">
                {
                  recipes.filter(
                    (r) =>
                      r.category ===
                      "Dinner"
                  ).length
                }
              </h2>

              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Dinner Recipes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MY RECIPES */}
      <div className="mt-14">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-4xl font-black text-slate-900 dark:text-white">
            My Recipes
          </h2>

          <Link to="/add-recipe">
            <button className="rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-orange-600">
              + Add Recipe
            </button>
          </Link>
        </div>

        {loading ? (

          <div className="py-20 text-center">
            <p className="text-slate-500 dark:text-slate-300">
              Loading recipes...
            </p>
          </div>

        ) : recipes.length === 0 ? (

          <div className="rounded-[2rem] bg-white p-16 text-center shadow-lg dark:bg-slate-900">
            <p className="text-xl text-slate-500 dark:text-slate-300">
              No recipes added yet.
            </p>
          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {recipes.map((recipe) => (

              <Link
                key={recipe._id}
                to={`/recipe/${recipe._id}`}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900"
              >

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

                <div className="p-6">

                  <div className="mb-3 flex items-center justify-between">

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
                      {recipe.category}
                    </span>

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ⏱ {recipe.cookingTime} mins
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {recipe.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;