const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const apiController = require('../controllers/taskController');

router.get('/get/:userId/:taskId', apiController.getTaskById);

router.post('/add', apiController.postAddTask);

router.delete('/delete', apiController.deleteDeleteTask);

router.put('/edit', apiController.putModifyTask);

router.get('/:userId/:start/:limit', apiController.getTasks);

module.exports = router;