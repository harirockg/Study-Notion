const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// PORT
const PORT = process.env.PORT || 4000;

// Database Connection
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ IMPROVED CORS (Specific Origins for Security)
app.use(
  cors({
    origin: [
      "https://study-notion-nu-brown.vercel.app", // Aapka Vercel URL
      "http://localhost:3000",                   // Local Testing
    ],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary Connection
cloudinaryConnect();

// 🔹 Routes
// Dhyan dein: Routes ke path wahi hone chahiye jo authAPI.js expect kar raha hai
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default/Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});