axios.js

import axios from "axios";

const api = axios.create({
	baseURL: "https://www.scratchprod.in/resume-generator-backend/",
	withCredentials: true,
});

export default api;