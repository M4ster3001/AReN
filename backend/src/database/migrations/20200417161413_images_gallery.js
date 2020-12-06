exports.up = function (knex) {
  return knex.schema.createTable('images_gallery', function (table) {
    table.increments('idImgGal');
    table.integer('idAd').notNullable();
    table.string('subtitle');
    table.double('size');
    table.string('key');
    table.string('url').notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('images_gallery');
};
