import axios from "axios";


const apiclient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    timeout: 10000
})

export default apiclient;