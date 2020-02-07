exports.up = function(knex) {
  return knex.schema.hasTable("images").then(exists => {
    if (!exists) {
      return knex.schema.createTable("images", t => {
        t.increments("id").primary();
        t.string("key", 255).notNullable();
        t.integer("user_id")
          .references("id")
          .inTable("users")
          .notNullable();
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("images");
};
