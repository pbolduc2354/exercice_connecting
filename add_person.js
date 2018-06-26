// Implement an add_person.js script that takes in the
// first name, last name and date of a famous person as three
// command line arguments and uses Knex to perform an insert.

// This should be enough to give you a basic familiarity
// with Knex's documentation and interface style.

// There's more to Knex than just query building though, so let's
// explore that next!
const settings = require("./settings");

// connect the database to knex
const knex = require('knex')({
  client: 'pg',
  connection: {
  host: settings.host,
  user : settings.user,
  password :settings.password,
  database : settings.database,
  },
});


// insert information in the DB
knex('famous_people')
.insert({
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4]
})
.then()
.finally(function() {
  knex.destroy();
});
