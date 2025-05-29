import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query: string) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: query,
            maxResults: 12,
            key: API_KEY,
        },
    });
    return response.data.items;
};

export const getBookById = async (id: string | undefined) => {
    const response = await axios.get(`${BASE_URL}/${id}`, {
        params: {
            key: API_KEY,
        },
    });
    return response.data;
};
