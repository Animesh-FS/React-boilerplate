import axios from "axios";
const API_URL = process.env.PUBLIC_API_URL;

const $Axios = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Basic ${window.btoa("photon:photon")}`,
  },
});

// $Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default $Axios;
