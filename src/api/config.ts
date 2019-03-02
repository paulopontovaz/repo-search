const Axios = require('axios');

const BASE_URL = 'https://api.github.com/search';
const AUTH_TOKEN = "ed2n70x6";
const axiosInstance = Axios.create({ baseURL: BASE_URL });

axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axiosInstance;
