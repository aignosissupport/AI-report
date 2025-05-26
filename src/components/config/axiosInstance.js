import axios from 'axios'
const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_MAIN_BACKEND
})

axiosInstance.interceptors.request.use(
    (response)=>response
)
export default axiosInstance;