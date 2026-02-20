import axios from "axios";

// instance axios OpenLibrary
const openLibraryAPI = axios.create({
  baseURL: "https://openlibrary.org",
});

// Instance axios untuk Backend Lokal
export const backendAPI = axios.create({
  baseURL: "http:localhost:5000/api",
});

//Login
export const loginUser = async (userData) => {
  return await backendAPI.post("/auth/login", userData);
};

export const registerUser = async (userData) => {
  return await backendAPI.post("/auth/register", userData);
};

//Fungsi untuk mencari buku berdasarkan judul
export const searchBooks = async (query) => {
  try {
    //Membatasi hasil 5 buku saja untuk testing
    const response = await openLibraryAPI.get(
      `/search.json?title=${query}&limit=5`,
    );
    return response.data.docs;
  } catch (error) {
    console.error("Gagal mengambil data dari OpenLibrary: ", error);
    return [];
  }
};

//Fungsi pembantu untuk mendapatkan URL cover buku yang beresolusi medium (M)
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
