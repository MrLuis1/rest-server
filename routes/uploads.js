const { Router } = require('express');
const { uploadFile } = require('../controllers/uploads');

const router = new Router();

router.post('/', uploadFile);

module.exports = router;