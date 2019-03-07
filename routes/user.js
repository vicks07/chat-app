const express = require('express');
const router = express.Router();

const user = require('../controllers/users.js')


router.post('/create',user.RegisterUser);
router.post('/login',user.Login);
router.patch('/add',user.AddContact);
router.patch('/request',user.SendRequest);
router.get('/display/request/:userId',user.DisplayRequest);

module.exports = router;