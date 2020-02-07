exports.up = function(knex, Promise) {
  return knex.schema.alterTable("images", t => {
    t.string("location").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("images", t => {
    t.dropColumns("location");
  });
};
