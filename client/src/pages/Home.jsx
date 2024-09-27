import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      const data = jwtDecode(accessToken);
      setUser(data);
      console.log(data);
    }
  }, [accessToken]);
  const url = `http://localhost:8000/user/upload/${user.id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileImg.length);

    try {
      const response = await axios.post(url, { img: profileImg });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertIntoBase64(file);
    setProfileImg(base64);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };
  return (
    <div>
      <h1>Hello {user.first_name}</h1>
      <button
        onClick={handleLogout}
        className="absolute top-3 right-4 p-2 bg-slate-800 text-white rounded-md"
      >
        Log out
      </button>
      <div className="bg-slate-300 w-20 h-20 rounded-full mt-10 ml-10 overflow-hidden border-2 border-slate-500">
        <img src={user.profile} alt="" className="w-full h-full" />
      </div>

      <form onSubmit={handleSubmit} className="mt-20 flex flex-col">
        <input
          type="file"
          name="profile"
          lable="image"
          id="profile"
          className="bg-red-500 w-56"
          onChange={handleFileUpload}
          accept=".jpeg, .jpg, .png"
        />
        <button className="w-20 bg-blue-500 mt-10 rounded-md p-3">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Home;

const convertIntoBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
