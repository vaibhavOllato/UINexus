const db = require("../config/db");

// Generate Unique PratishtanID
// const generatePratishtanID = async () => {
//   return new Promise((resolve, reject) => {
//     db.query("SELECT COUNT(*) AS count FROM users", (err, results) => {
//       if (err) reject(err);
//       const count = results[0].count + 1;
//       resolve(`rudra${String(count).padStart(3, "0")}`);
//     });
//   });
// };

const generatePratishtanID = async () => {
  let isUnique = false;
  let pratishtanID;

  while (!isUnique) {
    // Generate a random alphanumeric string
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    // const randomStr = Math.random().toString(36).substring(2, 8); 

    pratishtanID = `rudra${randomNum}`; // Example: rudraabc1234567

    // Check if the generated ID already exists
    const [existing] = await db.promise().query(
      "SELECT pratishtanID FROM users WHERE pratishtanID = ?",
      [pratishtanID]
    );

    // If the ID doesn't exist, we can proceed, otherwise regenerate
    if (existing.length === 0) {
      isUnique = true;
    }
  }

  return pratishtanID;
};


module.exports = { generatePratishtanID };
