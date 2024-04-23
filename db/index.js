const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (username, password) => {
  try{
    const user = await prisma.users.create({
      data: {
        username,
        password,
      },
    });
    return user;
  }catch(error){
    console.log(error);
    throw(error);
  }
};

const getAllPosts = async () => {
  try{
    const allPosts = await prisma.posts.findMany();
    return allPosts;
  }catch(error){
    console.log(error);
  }
};

const getPostById = async (id) => {
  try{
    const singlePost = await prisma.posts.findUnique({
      where: {
        id,
      },
    });
    return singlePost;
  }catch(error){
    console.log(error);
  }
};

const createPost = async (title, content, userId) => {
  try{
    const newPost = await prisma.posts.create({
      data: {
        title,
        content,
        userId
      },
    });
    return newPost;
  }catch(error){
    console.log(error);
  }
};

const updatePost = async (id, userId, title, content) => {
  try{
    const updatedPost = await prisma.posts.update({
      where: {
        id,
        userId
      },
      data: {
        title,
        content,
      },
    });
    return updatedPost;
  }catch(error){
    if(error.code === 'P2025'){
      return "Not your post, can not update."
    }
    console.log(error);
  }
};

const deletePost = async (id, userId) => {
  try{
    const deletedPost = await prisma.posts.delete({
      where: {
        id,
        userId
      }
    });
  }catch(error){
    if(error.code === 'P2025'){
      return "Not your post, can not delete."
    }
    return(error);
  }
};

module.exports = {
  createUser,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}