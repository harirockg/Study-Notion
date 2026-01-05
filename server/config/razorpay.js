const Razorpay = require("razorpay");
require("dotenv").config();

// Hum pehle check karenge ki keys mil rahi hain ya nahi
if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
    console.error("CRITICAL ERROR: Razorpay Keys are missing in Environment Variables!");
}

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});