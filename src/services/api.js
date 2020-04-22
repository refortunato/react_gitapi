import axios from "axios";

const api = axios.create({
    baseURL: "https://api.github.com", // https://api.github.com/repos/refortunato/gobarber_backend
});

export default api;
