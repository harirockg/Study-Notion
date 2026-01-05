const Razorpay = require("razorpay");
require("dotenv").config();

// Agar keys missing hain toh server crash nahi hoga, bas error log karega
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY || "dummy_key", 
    key_secret: process.env.RAZORPAY_SECRET || "dummy_secret",
});

module.exports = { instance };