import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const data = jwtDecode(token);
      setUser(data.first_name);
    }
  }, []);

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Hello {user}</h1>
      <button
        onClick={handleLogout}
        className="absolute top-3 right-4 p-2 bg-slate-800 text-white rounded-md"
      >
        Log out
      </button>
    </div>
  );
};

export default Home;
