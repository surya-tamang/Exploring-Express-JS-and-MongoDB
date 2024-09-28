import { jwtDecode } from "jwt-decode";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const decoded = jwtDecode(token);

const url = `http://localhost:8000/user/${decoded.id}`;

const getUser = async () => {
  const response = await axios.post(url);
  console.log(response);
  console.log(decoded);
};

export default getUser;
