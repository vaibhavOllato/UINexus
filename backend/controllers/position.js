// In your backend controller
const db = require('../config/db'); 

exports.getCommitteeMembers = async (req, res) => {
    try {
      const [rows] = await db.promise().query(
        "SELECT * FROM users WHERE position = ?",
        ["Committee member"]
      );
      // console.log(rows);
      
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




exports.updateUser = async (req, res) => {
  const { userId, firstName, lastName, gender, phone, email, place, position } = req.body;

  try {
    const [rows] = await db.promise().query(
      "UPDATE users SET firstName = ?, lastName = ?, gender = ?, phone = ?, email = ?, place = ?, position = ? WHERE pratishtanID = ?",
      [firstName, lastName, gender, phone, email, place, position, userId]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};



exports.deleteUser = async (req, res) => {
  const { userId } = req.params;  // Assume userId is passed in the URL parameter
  console.log("Deleting user with pratishtanID:", userId);

  try {
    const [rows] = await db.promise().query(
      "DELETE FROM users WHERE pratishtanID = ?",
      [userId]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
