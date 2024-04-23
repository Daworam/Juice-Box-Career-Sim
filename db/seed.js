const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {faker} = require('@faker-js/faker');

const seedUsers = async () => {
  try{
    const user1 = await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }
    })
    const user2 = await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }
    })
    const user3 = await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }
    })
  }catch(error){
    console.log(error);
  }
}

const seedPosts = async () => {
  const post1 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 1
    }
  })
  const post2 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 1
    }
  })
  const post3 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 1
    }
  })
  const post4 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 2
    }
  })
  const post5 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 2
    }
  })
  const post6 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 2
    }
  })
  const post7 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 3
    }
  })
  const post8 = await prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: 3
    }
  })
  const post9 = await prisma.posts.create({
    data: {
      title: faker.lorem.word(),
      content: faker.lorem.sentence(),
      userId: 3
    }
  })
};

const syncAndSeed = async () => {
  await seedUsers();
  console.log("Users Created");
  await seedPosts();
  console.log("Posts Created");
}
syncAndSeed()
.then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});