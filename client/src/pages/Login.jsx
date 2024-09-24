import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
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

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        userData
      );
      // return response;
      // console.log(response.data);
      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-300">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="p-6 bg-slate-50 rounded-xl"
      >
        <h1 className="text-xl font-bold mb-4 uppercase">Log In</h1>
        <input
          type="text"
          placeholder="email"
          onChange={handleChange}
          name="email"
          className="p-2 bg-slate-200 my-2 rounded-md"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          name="password"
          className="p-2 bg-slate-200 my-2 rounded-md"
        />
        <br />
        <span className="text-red-500 mt-3 text-xs">{error}</span>
        <br />
        <button
          type="submit"
          className="bg-neutral-800 w-full text-white py-2 rounded-md my-4"
        >
          Log In
        </button>
        <div className="mt-3">
          <span>No account?</span>
          <NavLink to={"/signup"} className="text-green-600 ml-1">
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
