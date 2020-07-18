exports.up = function (knex) {
  return knex.schema.createTable("invites", (table) => {
    table.increments();
    table.string("keyword", 64).unique().index().notNullable();
    table.string("ip", 16).unique().notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("invites");
};
