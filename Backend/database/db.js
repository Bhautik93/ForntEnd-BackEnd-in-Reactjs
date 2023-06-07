const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: "root",
    password: "",
    database: "userdb",
  },
});

module.exports = knex;
