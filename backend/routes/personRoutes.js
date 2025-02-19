// const express = require('express');
// const router = express.Router();
// const { getCommitteeMembers, getMemberPersons } = require('../controllers/position');

// // Route for fetching committee members
// router.get('/committee-members', getCommitteeMembers);

// // Route for fetching member persons
// router.get('/member-persons', getMemberPersons);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { 
  getCommitteeMembers, 
  getMemberPersons, 
  updateUser, 
  deleteUser 
} = require('../controllers/position');

// Route for fetching committee members
router.get('/committee-members', getCommitteeMembers);

// Route for fetching member persons
router.get('/member-persons', getMemberPersons);

// Route for updating a user (committee member or member person)
router.put('/update-user', updateUser);  // Use a PUT request for updating

// Route for deleting a user (committee member or member person)
router.delete('/delete-user/:userId', deleteUser);  // Use DELETE request with userId in URL

module.exports = router;
