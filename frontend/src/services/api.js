import axios from "axios";

const openLibraryAPI = axios.create({
  baseURL: "https://openlibrary.org",
});

const backendAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginUser = async (userData) => {
  return await backendAPI.post("/auth/login", userData);
};

export const registerUser = async (userData) => {
  return await backendAPI.post("/auth/register", userData);
};

export const searchBooks = async (query) => {
  try {
    const response = await openLibraryAPI.get(
      `/search.json?title=${query}&limit=5`,
    );
    return response.data.docs;
  } catch (error) {
    console.error("Gagal mengambil data dari OpenLibrary: ", error);
    return [];
  }
};

export const getCoverUrl = (coverId) => {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;
};

export const getBookDetails = async (workId) => {
  try {
    const response = await openLibraryAPI.get(`/works/${workId}.json`);
    return response.data;
  } catch (err) {
    console.error("Gagal mengambil detail buku:", error);
    return null;
  }
};

export const getBookReviews = async (bookId) => {
  return await backendAPI.get(`/reviews/${bookId}`);
};

export const addReview = async (reviewData) => {
  const token = localStorage.getItem("token");

  return await backendAPI.post("/reviews", reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
