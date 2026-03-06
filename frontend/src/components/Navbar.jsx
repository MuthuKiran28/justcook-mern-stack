import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const buttonClass =
  "inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img
            src="/JUST COOK LOGO2.png"
            alt="JUST COOK Logo"
            className="h-10 w-10 rounded object-contain"
          />
          <h1 className="text-base font-bold tracking-wide text-slate-900 sm:text-lg">
            JUST COOK RECIPE
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/add-recipe" className={buttonClass}>
                Add Recipe
              </Link>
              <button onClick={handleLogout} className={buttonClass} type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={buttonClass}>
                Login
              </Link>
              <Link to="/register" className={buttonClass}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
