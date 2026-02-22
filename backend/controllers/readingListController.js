import pool from "../config/database.js";

// Tambah atau Update Status Buku di Rak
export const updateReadingStatus = async (req, res) => {
  const { book_id, status } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO reading_lists (user_id, book_id, status) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (user_id, book_id) 
       DO UPDATE SET status = EXCLUDED.status 
       RETURNING *`,
      [user_id, book_id, status],
    );
    res.json({ message: "Status bacaan diperbarui", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui rak buku" });
  }
};

// Ambil Status Buku Spesifik untuk User
export const getBookStatus = async (req, res) => {
  const { book_id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "SELECT status FROM reading_lists WHERE user_id = $1 AND book_id = $2",
      [user_id, book_id],
    );

    // Jika tidak ada, kembalikan null agar frontend tahu buku belum masuk rak
    if (result.rows.length === 0) {
      return res.json({ status: null });
    }

    res.json({ status: result.rows[0].status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil status buku" });
  }
};

export const getUserReadingList = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM reading_lists WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil daftar buku" });
  }
};
