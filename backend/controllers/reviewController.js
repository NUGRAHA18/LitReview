import pool from "../config/database.js";

//Menambah ulasan buku
export const addReview = async (req, res) => {
  const { book_id, rating, content } = req.body;
  const user_id = req.user.id;

  try {
    const newReview = await pool.query(
      "INSERT INTO reviews (user_id, book_id, rating, content) VALUES ($1, $2, $3, $4)",
      [user_id, book_id, rating, content],
    );
    res.status(201).json({
      message: "Ulasan berhasil ditambahkan",
      review: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal menambahkan ulasan" });
  }
};

//Mengambil semua ulasan
export const getBookReviews = async (req, res) => {
  const { book_id } = req.params;

  try {
    //Join tabel users agar bisa menampilkan nama penulis ulasan
    const reviews = await pool.query(
      `SELECT r.id, r.rating, r.content, r.created_at, u.username 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.book_id = $1 
       ORDER BY r.created_at DESC`,
      [book_id],
    );
    res.json(reviews.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil buku",
    });
  }
};
