const express = require('express');
const {
  addDonation,
  getAllDonations,
  getDonationByAccountHolderName,
  deleteDonation,
} = require('../controllers/donationController');

const router = express.Router();

router.post('/add', addDonation);  // Add a new donation
router.get('/all-donate', getAllDonations); // Get all donations
// Route to get donation by account holder name
router.get('/:accountHolderName', getDonationByAccountHolderName);
router.delete('/:id', deleteDonation); // Delete a donation by ID

module.exports = router;
