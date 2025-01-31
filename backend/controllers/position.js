// In your backend controller
const db = require('../config/db'); 

exports.getCommitteeMembers = async (req, res) => {
    try {
      const [rows] = await db.promise().query(
        "SELECT * FROM users WHERE position = ?",
        ["Committe member"]
      );
      res.status(200).json(rows);  // Return the committee members
    } catch (error) {
      console.error("Error fetching committee members:", error);
      res.status(500).json({ message: "Error fetching committee members", error: error.message });
    }
  };
  

  // In your backend controller
exports.getMemberPersons = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE position = ?",
      ["Members"]  // Or modify this to any designation that indicates 'member person'
    );
    res.status(200).json(rows);  // Return the member persons
  } catch (error) {
    console.error("Error fetching member persons:", error);
    res.status(500).json({ message: "Error fetching member persons", error: error.message });
  }
};
