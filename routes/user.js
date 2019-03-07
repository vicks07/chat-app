const express = require('express');
const router = express.Router();

const user = require('../controllers/users.js')


router.post('/create',user.RegisterUser);
router.post('/login',user.Login);

module.exports = router;