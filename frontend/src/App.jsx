import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";
<<<<<<< HEAD
=======
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21

function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>
=======
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
    </AuthProvider>
  );
}

export default App;
