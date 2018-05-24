const express = require('express');
const router = express.Router();
const  Centercontroller = require('../controllers/Centercontroller');

router.post('/centers', Centercontroller.createNewCenter);
router.get('/centers', Centercontroller.getAllCenter);
router.get('/:id', Centercontroller.getSingleCenter);

module.exports = router;