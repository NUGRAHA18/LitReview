import axios from "axios";

const openLibraryAPI = axios.create({
  baseURL: "https://openlibrary.org",
});

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const backendAPI = axios.create({
  baseURL: API_URL,
});

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

export const getBookDetails = async (workId) => {
  try {
    const response = await openLibraryAPI.get(`/works/${workId}.json`);
    return response.data;
  } catch (err) {
    console.error("Gagal mengambil detail buku:", err);
    return null;
  }
};

export const getCoverUrl = (coverId) => {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;
};

//Fungsi bantuan untuk Token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

//--Authentikasi--
export const loginUser = async (userData) => {
  return await backendAPI.post("/auth/login", userData);
};

export const registerUser = async (userData) => {
  return await backendAPI.post("/auth/register", userData);
};

export const getBookReviews = async (bookId) => {
  return await backendAPI.get(`/reviews/${bookId}`);
};

export const addReview = async (reviewData) => {
  const token = localStorage.getItem("token");

  return await backendAPI.post("/reviews", reviewData, getAuthHeaders());
};

//Mengambil status buku di rak user
export const getBookReadingStatus = async (bookId) => {
  const token = localStorage.getItem("token");
  return await backendAPI.get(`/reading-list/status/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Memperbarui status buku di rak user
export const updateBookReadingStatus = async (bookId, status) => {
  const token = localStorage.getItem("token");
  return await backendAPI.post(
    "/reading-list/status",
    { book_id: bookId, status },
    getAuthHeaders(),
  );
};

export const getMyReadingList = async () => {
  const token = localStorage.getItem("token");
  return await backendAPI.get("/reading-list", getAuthHeaders());
};

//hapus buku dari rak
export const removeFromReadingList = async (bookId) => {
  const token = localStorage.getItem("token");
  return await backendAPI.delete("/reading-list/${bookId}", getAuthHeaders());
};
