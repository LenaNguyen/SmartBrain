exports.up = function(knex, Promise) {
  const createUsersTable = () => {
    return knex.schema.hasTable("users").then(exists => {
      if (!exists) {
        return knex.schema.createTable("users", t => {
          t.increments("id").primary();
          t.string("name", 255).notNullable();
          t.string("email", 255)
            .unique()
            .notNullable();
          t.bigInteger("entries").defaultTo(0);
          t.timestamp("joined", { useTz: false })
            .defaultTo(knex.fn.now())
            .notNullable();
        });
      }
    });
  };

  const createLoginTable = () => {
    return knex.schema.hasTable("login").then(exists => {
      if (!exists) {
        return knex.schema.createTable("login", t => {
          t.increments("id").primary();
          t.string("email", 255)
            .references("email")
            .inTable("users")
            .notNullable();
          t.string("hash", 100).notNullable();
        });
      }
    });
  };

  return createUsersTable().then(createLoginTable);
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist("login").dropTableIfExist("users");
};
