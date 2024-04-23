const router = require("express").Router();
const {getAllPosts, getPostById} = require('../db/index');

router.get('/', async (req, res) => {
  try{
    const foundPosts = await getAllPosts();
    res.send(foundPosts);
  }catch(error){
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const onePost = await getPostById(id);
    res.send(onePost);
  }catch(error){
    res.send(error);
  }
})

module.exports = router;