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
}

module.exports = {
  createUser,
}