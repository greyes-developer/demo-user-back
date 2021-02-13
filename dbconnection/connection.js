const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbmovies",
});

connection.connect(function (err) {
  if (err) throw err;
});

const dbconnection = () => {
  if (!connection) {
    connection.connect((err) => {
      if (err) throw err;
      return connection;
    });
  }
  return connection;
};

module.exports = {
  dbconnection,
};
