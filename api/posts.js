const router = require("express").Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../db/index");

router.get("/", async (req, res) => {
  try {
    const foundPosts = await getAllPosts();
    res.send(foundPosts);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const onePost = await getPostById(id);
    res.send(onePost);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Please log in to write a post.");
  } else {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;

      const newlyCreatedPost = await createPost(
        title,
        content,
        parseInt(userId)
      );
      res.send(newlyCreatedPost);
    } catch (error) {
      res.send(error);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("Please log in to udpate a post.");
  } else {
    try {
      const id = parseInt(req.params.id);
      const { title, content } = req.body;
      const userId = req.user.id;

      const newlyUpdatedPost = await updatePost(id, userId, title, content);
      res.send(newlyUpdatedPost);
    
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  if(!req.user) {
    return res.status(401).send("Please log in to delete a post.");
  } else {
    try{
      const id = parseInt(req.params.id);
      const userId = req.user.id;

      const newlyDeletedPost = await deletePost(id, userId);
      res.send(newlyDeletedPost);
    }catch(error){
      next(error);
    }
  }
})

module.exports = router;
