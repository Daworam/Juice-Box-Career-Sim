const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const {createUser} = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try{
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const registerUser = await createUser(username, hashedPassword);

    const token = jwt.sign({id: registerUser.id}, process.env.JWT);
    res.send({token});
  }catch(error){
    res.send(error);
  }
});

router.post("/login", async (req, res, next) => {
  try{
    const {username, password} = req.body;
    
    const logUser = await prisma.users.findUnique({
      where: {
        username
      }
    });

    if(!logUser){
      return res.status(401).send("Username or Password is incorrect, please try again.")
    }
    const matchingPassword = await bcrypt.compare(req.body.password, logUser.password);
    if(logUser && matchingPassword){
      const token = jwt.sign({id: logUser.id}, process.env.JWT);
    res.send({token});
    }else{
      return res.status(401).send("Username or Password is incorrect, please try again.")
    }
  }catch(error){
    next(error);
  }
})

module.exports = router;