const { Router } = require('express');
const { userGet, deleteUser, putUser, postUser } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/', deleteUser);


module.exports = router