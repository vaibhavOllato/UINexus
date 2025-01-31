const express = require('express');
const router = express.Router();
const { getCommitteeMembers, getMemberPersons } = require('../controllers/position');

// Route for fetching committee members
router.get('/committee-members', getCommitteeMembers);

// Route for fetching member persons
router.get('/member-persons', getMemberPersons);

module.exports = router;
