import axios from "axios";

//Membuat instance axios khusus untuk OpenLibrary
const openLibraryAPI = axios.create({
  baseURL: "https://openlibrary.org",
});

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
