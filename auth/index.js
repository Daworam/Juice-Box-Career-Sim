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

module.exports = router;