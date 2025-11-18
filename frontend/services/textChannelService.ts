import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = API_URL + '/api/v1';
axios.defaults.withCredentials = true;

export const deleteTextChannel = async (serverId: string, channelId: string) => {
    try {
        const response = await axios.delete(`/text-channels/${channelId}`, {
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

export const sendMessage = async (channelId: string, messageData: { content: string; }) => {
    try {
        const response = await axios.post(`/text-channels/${channelId}/messages`, messageData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        console.log("Message response:", response);
        return response;
    }
    catch (err) {
        const error = err as AxiosError;
        console.error(error);
        return error.response;
    }
}

export const getMessages = async (channelId: string) => {
    try {
        const response = await axios.get(`/text-channels/${channelId}/messages`, {
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

