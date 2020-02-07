// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "",
      password: "",
      database: "smartbrain"
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
      tableName: "knex_migrations"
    }
  }
};
