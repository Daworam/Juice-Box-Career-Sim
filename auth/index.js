const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {createUser} = require('../db');

router.post("/register", async (req, res) => {
  try{
    const {username, password} = req.body;
    const registerUser = await createUser(username, password);
    res.send(registerUser);
  }catch(error){
    res.send(error);
  }
});

router.post("/login", async (req, res, next) => {
  try{
    const {username, password} = req.body;
    const logUser = await prisma.users.findUnique({
      where: {
        username,
        password,
      }
    });

    if(!logUser){
      return res.status(401).send("Username or Password is incorrect, please try again.")
    }
    res.send("Success");
  }catch(error){
    next(error);
  }
})

module.exports = router;