const db = require('../config/db');

// ➤ Add a new donation
const addDonation = (req, res) => {
  const { accountHolderName, accountNumber, amount, position, address, bankName, transactionId } = req.body;

  if (!accountHolderName || !accountNumber || !amount || !bankName || !transactionId) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  const sql = `INSERT INTO rudra_account (accountHolderName, accountNumber, amount, position, address, bankName, transactionId) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [accountHolderName, accountNumber, amount, position, address, bankName, transactionId], (err, result) => {
    if (err) {
      console.error('Error inserting donation:', err);
      return res.status(500).json({ message: 'Error processing donation' });
    }
    res.status(201).json({ message: 'Donation added successfully', id: result.insertId });
  });
};

// ➤ Get all donations
const getAllDonations = (req, res) => {
  db.query('SELECT * FROM rudra_account ORDER BY createdAt DESC', (err, results) => {
    if (err) {
      console.error('Error fetching donations:', err);
      return res.status(500).json({ message: 'Error retrieving donations' });
    }
    res.status(200).json(results);
  });
};

// ➤ Get a single donation by ID
const getDonationByAccountHolderName = (req, res) => {
    const { accountHolderName } = req.params;
  
    db.query('SELECT * FROM rudra_account WHERE accountHolderName = ?', [accountHolderName], (err, results) => {
      if (err) {
        console.error('Error fetching donation:', err);
        return res.status(500).json({ message: 'Error retrieving donation' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Donation not found' });
      }
      res.status(200).json(results[0]);
    });
  };
  

// ➤ Delete a donation by ID
const deleteDonation = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM rudra_account WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting donation:', err);
      return res.status(500).json({ message: 'Error deleting donation' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ message: 'Donation deleted successfully' });
  });
};

module.exports = {
  addDonation,
  getAllDonations,
  getDonationByAccountHolderName,
  deleteDonation,
};
