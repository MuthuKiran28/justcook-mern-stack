import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

<<<<<<< HEAD
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

=======
const buttonClass =
  "inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
<<<<<<< HEAD
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
  <img 
    src="/JUST COOK LOGO2.png" 
    alt="JUST COOK Logo" 
    style={{ 
      height: "40px", 
      marginRight: "10px", 
      objectFit: "contain" 
    }} 
  />
  <h1 style={{ margin: 0, color: "#000" }}>JUST COOK RECIPE</h1>
</Link>

        <div className="flex gap-x-4">
          {user ? (
            <div className="flex gap-x-4">
              <Link to="/add-recipe">
                <button className="flex items-center gap-1">
                  {/* Add Recipe Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Recipe
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
              >
                {/* Logout Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3h-9m0 0l3-3m-3 3l3 3" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="flex items-center gap-1">
                  {/* Login Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="flex items-center gap-1">
                  {/* Register Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z" />
                  </svg>
                  Register
                </button>
=======
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
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
