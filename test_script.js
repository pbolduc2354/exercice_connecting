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
  // console.log(queryParam)
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [queryParam], (err, result) => {
     // client.query("SELECT * FROM famous_people", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    client.end();
  });
});

// console.log(client.database);


// extract the argument from the comandline process.argv
// connect to the database
// Build the query