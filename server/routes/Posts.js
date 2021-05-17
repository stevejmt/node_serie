const express = require('express');
const router = express.Router();
const {Posts} = require('../models');
const upload = require("../middleware/multer-config")
const userController = require('../controllers/userController');

// Tous les posts
router.get('/', userController.postList);

// Créer un nouveau post
router.post("/", upload.single("image"), userController.postAdd);

// Delete un post
router.delete("/:id", userController.postDelete);

// Update un post
router.put('/update/:id', userController.postUpdate);

// Obtenir les infos d'un post selon son ID
router.get('/byId/:id', userController.postID);

module.exports = router;

// Tous les posts
// router.get('/', async (req, res) => {
//   const listOfPosts = await Posts.findAll();
//     res.json(listOfPosts);
// }); 

// Créer un nouveau post
// router.post("/", upload.single("image"), async (req, res) => {
    
//    delete req.body.image

//    const data = {
//        image : req.file.filename,
//        ...req.body
//    }

//    await Posts.create(data);
//    res.status(203).json();
// });

// Delete un post
// router.delete("/:id", async (req, res) => {
//    const id = req.params.id;
//  await  Posts.destroy({
//        where: {id: id}
//    });
//    res.json("Deleted");
// })

// Update un post
// router.put('/update/:id', async (req, res) => {
//    const id = req.params.id;
//
//  await Posts.update(req.body, {
//        where: {id: id}
//    });
//    res.json("Updated");
// })

// Obtenir les infos d'un post selon son ID
// router.get('/byId/:id', async (req, res) => {
//    const id = req.params.id
//    const post = await Posts.findByPk(id);
//    res.json(post);
// })