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

// Get the argument put in the terminal
function getArgument() {
  return process.argv[2];
}

// Search in the database for the argument and send the information to
// the function printReslut()
knex.select('*').from('famous_people')
  .where('first_name', getArgument())
  .then(function(rows) {
    printResult(rows);
  })
  .catch(error => {
    console.log("Error:", error);
    return Promise.resolve();
  })
  .finally(()=> {
    console.log("Query is completed!");
    knex.destroy();
  });


// Take the information and put in in a string to console.log it
function printResult(result) {
  let count = 0;

  console.log(`Found ${result.length} person(s) by the name '${process.argv[2]}':`)
  for (people of result) {
    count += 1;
    console.log(`- ${count}: ${people.first_name} ${people.last_name}, born '${people.birthdate}'`)
  };
};





// function getArgument() {
//   return process.argv[2];
// }

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   var queryParam = getArgument()
//   client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [queryParam], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     printResult(result.rows);
//     client.end();
//   });
// });

// function printResult (result) {
//   let count = 0;

//   console.log(`Found ${result.length} person(s) by the name '${process.argv[2]}':`)
//   for (people of result) {
//     count += 1;
//     console.log(`- ${count}: ${people.first_name} ${people.last_name}, born '${people.birthdate}'`)
//   };
// };