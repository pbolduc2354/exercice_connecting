const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user : settings.user,
  password :settings.password,
  database : settings.database,
  host: settings.host,
  port : settings.port,
  ssl : settings.ssl
});

function getArgument() {
  return process.argv[2];
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  var queryParam = getArgument()
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [queryParam], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printResult(result.rows);
    client.end();
  });
});

function printResult (result) {
  let count = 0;

  console.log(`Found ${result.length} person(s) by the name '${process.argv[2]}':`)
  for (people of result) {
    count += 1;
    console.log(`- ${count}: ${people.first_name} ${people.last_name}, born '${people.birthdate}'`)
  };
};


// extract the argument from the comandline process.argv
// connect to the database
// Build the query