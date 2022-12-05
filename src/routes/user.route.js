const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const upload = require('../middlewares/upload')


router.get('/', userController.getAllUsers);
router.post('/create',upload.single('foto'), userController.insert);
// router.post('/create',upload.single('foto'), userController.insert, 

// async(req, res) =>{
//     await sharp(req.file.buffer).resize({width:500, height:500})
// });

router.put('/:id', upload.single('foto'), userController.update);

module.exports = router