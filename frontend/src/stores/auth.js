import { ref } from "vue";

//inisialisasi localstorage
const token = ref(localStorage.getItem("token") || null);
const user = ref(JSON.parse(localStorage.getItem("user") || null));

export function useAuth() {
  // Fungsi untuk menyimpan sesi saat login berhasil
  const setSession = (newToken, userData) => {
    token.value = newToken;
    user.value = userData;
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearSession = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  //cek user login  ?
  const isAuthenticated = () => {
    return !!token.value; // Mengembalikan true jika token ada
  };

  return {
    token,
    user,
    setSession,
    clearSession,
    isAuthenticated,
  };
}
