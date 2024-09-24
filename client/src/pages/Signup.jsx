import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { first_name, last_name, email, password } = userData;
    if (!first_name || !last_name || !email || !password) {
      setError("All fields required");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/user",
          userData
        );
        if (response.status === 201) {
          setSuccess(response.data.msg);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (err) {
        setError(err.response.data.msg);
      }
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-300">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="p-6 bg-slate-100 rounded-xl w-72"
      >
        <h1 className="text-xl font-bold mb-4 uppercase">Sign Up</h1>
        <div className="w-full flex gap-1">
          <input
            type="text"
            placeholder="first name"
            onChange={handleChange}
            value={userData.first_name}
            name="first_name"
            className="p-2 bg-slate-200 my-2 rounded-md w-6/12"
          />
          <input
            type="text"
            placeholder="last name"
            onChange={handleChange}
            value={userData.last_name}
            name="last_name"
            className="p-2 bg-slate-200 my-2 rounded-md w-6/12"
          />
        </div>
        <input
          type="text"
          placeholder="email"
          onChange={handleChange}
          value={userData.email}
          name="email"
          className="p-2 bg-slate-200 my-2 rounded-md w-full"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={userData.password}
          className="p-2 bg-slate-200 my-2 rounded-md w-full"
        />
        <br />
        <span className="text-green-500 mt-3 text-xs">{success}</span>
        <span className="text-red-500 mt-3 text-xs">{error}</span>
        <br />
        <button
          type="submit"
          className="bg-neutral-800 w-full text-white py-2 rounded-md my-4"
        >
          Sign Up
        </button>
        <div className="mt-3">
          <span>Have account?</span>
          <NavLink to={"/"} className="text-green-600 ml-1">
            Log In
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Signup;
