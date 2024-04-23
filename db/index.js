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
}

module.exports = {
  createUser,
  getAllPosts,
  getPostById
}