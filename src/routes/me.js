const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/lights', meController.storedLights);
router.get('/trash/lights', meController.trashLights);

module.exports = router;