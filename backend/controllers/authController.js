const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generatePratishtanID } = require("../models/userModel");
require("dotenv").config();

// User Registration

// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, gender, phone, email, password, place } = req.body;

//     if (!firstName || !lastName || !gender || !phone || !email || !password || !place) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     console.log("Checking existing user:", email, phone);
//     const [rows] = await db.promise().query(
//       "SELECT * FROM users WHERE email = ? OR phone = ?",
//       [email, phone]
//     );
    
//     console.log("Existing User Data:", rows);
//     if (rows.length > 0) {
//       return res.status(400).json({ message: "Email or phone already exists." });
//     }

//     let pratishtanID;
//     try {
//       pratishtanID = await generatePratishtanID();
//     } catch (err) {
//       console.error("PratishtanID Generation Error:", err);
//       return res.status(500).json({ message: "Error generating PratishtanID" });
//     }

//     if (!password || password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     console.log("Registering new user...");
//     await db.promise().query(
//       "INSERT INTO users (pratishtanID, firstName, lastName, gender, phone, email, password, place) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//       [pratishtanID, firstName, lastName, gender, phone, email, hashedPassword, place]
//     );

//     res.status(201).json({ message: "User registered successfully", pratishtanID });
//   } catch (error) {
//     console.error("Server Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

exports.register = async (req, res) => {

  try {
    const { firstName, lastName, gender, phone, email, password, place, position } = req.body;
    console.log("Request Body:", position);


    // Check if all required fields are provided
    if (!firstName || !lastName || !gender || !phone || !email || !password || !place) {
      return res.status(400).json({ message: "All fields except position are required." });
    }

    // Check if email or phone already exists in the database
    console.log("Checking existing user:", email, phone);
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );

    console.log("Existing User Data:", rows);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email or phone already exists." });
    }

    // Generate pratishtanID (ID for the user)
    let pratishtanID;
    try {
      pratishtanID = await generatePratishtanID();
    } catch (err) {
      console.error("PratishtanID Generation Error:", err);
      return res.status(500).json({ message: "Error generating PratishtanID" });
    }

    // Validate password
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Registering new user...");
    await db.promise().query(
      "INSERT INTO users (pratishtanID, firstName, lastName, gender, phone, email, password, place, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [pratishtanID, firstName, lastName, gender, phone, email, hashedPassword, place, position]
    );

    res.status(201).json({ message: "User registered successfully", pratishtanID });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





// User Login
// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const [user] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Simply return the user data without token generation
    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

