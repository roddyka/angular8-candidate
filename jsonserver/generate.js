var faker = require("faker");

var database = { candidates: [] };

for (var i = 1; i <= 20; i++) {
  database.candidates.push({
    id: i,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    phone: faker.phone.phoneNumber(),
    role: faker.name.jobTitle(),
  });
}

console.log(JSON.stringify(database));
