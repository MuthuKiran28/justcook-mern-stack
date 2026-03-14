import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
=======
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
<<<<<<< HEAD
      console.error("Register error:, ", err);
=======
      setError(err.response?.data?.message || "Register failed. Please try again.");
    } finally {
      setLoading(false);
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
=======
    <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Create account</h1>
      <p className="mb-4 text-sm text-slate-500">Save and share your favorite recipes.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p> : null}
        <div>
          <label className="mb-1 block text-sm text-slate-700">Username</label>
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
<<<<<<< HEAD
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
=======
            className="w-full rounded-lg border border-slate-300 p-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-700">Email</label>
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
<<<<<<< HEAD
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
=======
            className="w-full rounded-lg border border-slate-300 p-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-700">Password</label>
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
            required
            className="w-full p-2 border rounded"
=======
            minLength={8}
            required
            className="w-full rounded-lg border border-slate-300 p-2"
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
          />
        </div>
        <button
          type="submit"
<<<<<<< HEAD
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
=======
          disabled={loading}
          className="w-full rounded-lg bg-orange-500 p-2 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
        </button>
      </form>
    </div>
  );
};

export default Register;
