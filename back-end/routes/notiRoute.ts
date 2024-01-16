export {};
const express = require('express');
const notiController = require('../controller/notiController');

const router = express.Router();
router.post('/getRelatedNoti', notiController.getRelatedNoti);
router.get('/', notiController.getAllNoti);
router.post('/', notiController.addNoti);

module.exports = router;
