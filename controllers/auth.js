const bcrypt = require("bcryptjs");

const { dbconnection } = require("../dbconnection/connection");

const login = (userData, callback) => {
  if (dbconnection()) {
    dbconnection().query(
      `SELECT * FROM users WHERE email='${userData.email}'`,
      (err, results, fields) => {
        if (err) {
          console.log(`El error es: ${err}`);
          callback(404, {
            success: false,
            data: {
              msg: "Email or password incorrect",
            },
          });
        } else {
          if (results && results.length == 0) {
            return callback(404, {
              success: false,
              data: {
                msg: "Email or password incorrect",
              },
            });
          }
          //Confirm password
          const validPassword = bcrypt.compareSync(
            userData.password,
            results[0].password
          );
          if (!validPassword) {
            console.log("La contraseña no es válida");
            callback(404, {
              success: false,
              data: { msg: "Email or password incorrect" },
            });
          } else {
            dbconnection().query(
              `SELECT * FROM users where id='${results[0].id}'`,
              (err, results, fields) => {
                if (err) {
                  callback(500, {
                    success: false,
                    data: err,
                  });
                } else {
                  callback(null, {
                    success: true,
                    data: {
                      id: results[0].id,
                      name: results[0].name,
                      surname: results[0].surname,
                    },
                  });
                }
              }
            );
          }
        }
      }
    );
  }
};

module.exports = {
  login,
};
