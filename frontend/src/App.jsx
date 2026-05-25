import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-[#020617] dark:text-white">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <main className="py-2">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/recipe/:id" element={<RecipeDetail />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-recipe"
              element={
                <ProtectedRoute>
                  <AddRecipe />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-recipe/:id"
              element={
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
