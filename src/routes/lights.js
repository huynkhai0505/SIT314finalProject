const express = require('express');
const router = express.Router();

const lightController = require('../app/controllers/LightController');

router.get('/create', lightController.create);
router.post('/store', lightController.store);
router.get('/:id/edit', lightController.edit);
router.post('/handle-form-actions', lightController.handleFormActions);
router.put('/:id', lightController.update);
router.patch('/:id/restore', lightController.restore);
router.delete('/:id', lightController.destroy);
router.delete('/:id/force', lightController.forceDestroy);
router.get('/:slug', lightController.show);

module.exports = router;