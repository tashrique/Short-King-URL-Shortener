import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const shortenUrl = async (originalUrl) => {
    try {
        const response = await axios.post(`${API_URL}/shorten`, { originalUrl });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
