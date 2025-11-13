import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = API_URL + '/api/v1';
axios.defaults.withCredentials = true;

export const getMe = async () => {
    try {
        const response = await axios.get('/users/me', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
            console.log("Unauthorized");
            return { status: 401, data: null };
        }
        console.error(error);
        return { status: 500 , data: null};
    }
}
export const loginUser = async (credentials: { usernameoremail: string; password: string; }) => {
    try {
        const response = await axios.post('/users/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const signUpUser = async (userData: { username: string; email: string; password: string; }) => {
    try {
        const response = await axios.post('/users/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}