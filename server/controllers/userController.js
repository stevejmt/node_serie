const {Posts} = require('../models');

exports.postList = async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
}

exports.postAdd = async (req, res) => {
    
    delete req.body.image

    const data = {
        image : req.file.filename,
        ...req.body
    }

    await Posts.create(data);
    res.status(203).json();
}

exports.postDelete = async (req, res) => {
    const id = req.params.id;
  await  Posts.destroy({
        where: {id: id}
    });
    res.json("Deleted");
}

exports.postUpdate = async (req, res) => {
        const id = req.params.id;
    
      await Posts.update(req.body, {
            where: {id: id}
        });
        res.json("Updated");
     }

exports.postID = async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post);
}