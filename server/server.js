require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/test", (req, res) => res.json({ message: "Server is alive" }));

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
