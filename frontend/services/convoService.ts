import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = API_URL + '/api/v1';
axios.defaults.withCredentials = true;

export const createOrGetConvo = async (participantId: string) => {
    try {
        const response = await axios.post('/convos', { participantId }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (err) {
        const error = err as AxiosError;
        console.error(error);
        return error.response;
    }
}

export const getUserConvos = async () => {
    try {
        const response = await axios.get('/convos', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (err) {
        const error = err as AxiosError;
        console.error(error);
        return error.response;
    }
}

export const getConvoById = async (convoId: string) => {
    try {
        const response = await axios.get(`/convos/${convoId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (err) {
        const error = err as AxiosError;
        console.error(error);
        return error.response;
    }
}


export const sendMessage = async (convoId: string, content: string) => {
    try {
        const response = await axios.post(`/convos/${convoId}/messages`, { content }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (err) {
        const error = err as AxiosError;
        console.error(error);
        return error.response;
    }
}

export const getMessages = async (convoId: string) => {
    try {
        const response = await axios.get(`/convos/${convoId}/messages`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch (err) {
        const error = err as AxiosError;
        console.error(error);
        return error.response;
    }
}
