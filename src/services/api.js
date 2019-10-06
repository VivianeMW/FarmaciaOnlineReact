import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/Pin3_API/webresources'
});

export default api;