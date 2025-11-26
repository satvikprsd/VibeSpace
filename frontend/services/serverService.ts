import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = API_URL + '/api/v1';
axios.defaults.withCredentials = true;

export const getUserServers = async () => {
    try {
        const response = await axios.get('/servers', {
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

export const getServerById = async (serverId: string) => {
    try {
        const response = await axios.get(`/servers/${serverId}`, {
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

export const createServer = async (serverData: { name: string; description?: string; }) => {
    try {
        const response = await axios.post('/servers', serverData, {
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

export const generateInvite = async (serverId: string, expiresAt?: string, maxAge?: number, maxUses?: number | null) => {
    try {
        const response = await axios.post(`/servers/${serverId}/invite`, { expiresAt, maxAge, maxUses }, {
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

export const getInviteDetails = async (inviteCode: string) => {
    try {
        const response = await axios.get(`/servers/invite/${inviteCode}`, {
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


export const joinServer = async (inviteCode: string) => {
    try {
        const response = await axios.get(`/servers/join/${inviteCode}`, {
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

export const leaveServer = async (serverId: string) => {
    try {
        const response = await axios.get(`/servers/${serverId}/leave`, {
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

export const createTextChannel = async (serverId: string, channelData: { name: string; }) => {
    try {
        const response = await axios.post(`/servers/${serverId}/text-channels`, channelData, {
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

