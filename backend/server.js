const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const personRoutes = require('./routes/personRoutes');
const donationRoutes = require('./routes/donationRoutes');

// Import routes
const blogRoutes = require('./routes/blogRoutes');


const dotenv = require("dotenv");
dotenv.config(); // This loads the environment variables from the .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable cross-origin requests

// Use the person routes
app.use('/api/person', personRoutes); 




// Use the routes
app.use('/api', blogRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/donations', donationRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
