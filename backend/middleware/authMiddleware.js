import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Ambil token dari header request
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "Akses ditolak.  Token tidak ada" });

  try {
    const token = authHeader.replace("Bearer", "");
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token tidak valid" });
  }
};
