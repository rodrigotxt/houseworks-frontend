import axios from 'axios';
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api' // Use a URL da API, ou /api se estiver no mesmo domínio
});
export default instance;