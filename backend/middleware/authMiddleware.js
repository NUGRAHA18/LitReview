import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Ambil token dari header request
  const authHeader = req.header("Authorization");
  console.log(
    "Secret di Middleware:",
    process.env.JWT_SECRET ? "TERDETEKSI" : "TIDAK TERDETEKSI",
  );
  if (!process.env.JWT_SECRET) {
    console.error(
      "FATAL: JWT_SECRET tidak ditemukan di environment variables!",
    );
    return res.status(500).json({ message: "Konfigurasi server error" });
  }
  if (!authHeader)
    return res.status(401).json({ message: "Akses ditolak.  Token tidak ada" });

  try {
    const token = authHeader.replace("Bearer ", "");
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    console.log("JWT Error:", err.message);
    res.status(400).json({ message: "Token tidak valid" });
  }
};
