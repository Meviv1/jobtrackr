// import axios from'axios';

// const API = axios.create({
//     baseURL:'http://localhost:5000/api',
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://jobtrackr-ztjf.onrender.com/api", // ✅ Your deployed backend URL
  withCredentials: true,
});

export default API;
