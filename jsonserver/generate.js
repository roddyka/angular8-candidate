var faker = require("faker");

var database = { candidates: [], posts: [] };

for (var i = 1; i <= 6; i++) {
  database.candidates.push({
    id: i,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    phone: faker.phone.phoneNumber(),
    role: faker.name.jobTitle(),
  });

  database.posts.push({
    id: i,
    title: faker.lorem.word(),
    content: faker.lorem.paragraph(),
    datetime: new Date(),
  });
}

console.log(JSON.stringify(database));
