
exports.up = function(knex, Promise) {
  return knex.schema.table('milestones', function(table){
    table.integer('famous_people_id')
      table
          .foreign('famous_people_id')
          .references('id')
          .on('famous_people')
          .onDelete('CASCADE');

  })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])

};
