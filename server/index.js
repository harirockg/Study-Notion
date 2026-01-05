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

// 🔹 Load env only once
dotenv.config();

// 🔹 PORT
const PORT = process.env.PORT || 4000;

// 🔹 DB
database.connect();

// 🔹 Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ FIXED CORS (Vercel + localhost + previews all allowed)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// 🔹 Cloudinary
cloudinaryConnect();

// 🔹 Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// 🔹 Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
