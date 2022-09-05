const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');

router.get('/', viewsController.getView);
router.post('/', viewsController.sendMail);

module.exports = router;
