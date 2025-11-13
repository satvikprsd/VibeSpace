import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = API_URL + '/api/v1';
axios.defaults.withCredentials = true;

export const getUserServers = async () => {
    try {
        const response = await axios.get('/servers/all', {
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


export const createServer = async (serverData: { name: string; description?: string; }) => {
    try {
        const response = await axios.post('/servers/create', serverData, {
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

export const generateInvite = async (serverId: string, expiresAt?: string) => {
    try {
        const response = await axios.post(`/servers/${serverId}/invite`, { expiresAt }, {
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

export const joinServer = async (inviteCode: string) => {
    try {
        const response = await axios.post('/servers/join', { inviteCode }, {
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

export const leaveServer = async (serverId: string) => {
    try {
        const response = await axios.post('/leave', { serverId }, {
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
