module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:postgres@localhost/hnefatafl",
  },
  production: {
    client: "pg",
    connection: process.env.POSTGRES,
  },
};
