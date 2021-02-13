const bcrypt = require("bcryptjs");

const { dbconnection } = require("../dbconnection/connection");

const newUser = (userData, callback) => {
  //Encrypt password
  const salt = bcrypt.genSaltSync();
  userData.password = bcrypt.hashSync(userData.password, salt);

  if (dbconnection()) {
    dbconnection().query(
      `SELECT email FROM users WHERE email='${userData.email}'`,
      (err, results, fields) => {
        if (results[0] && results[0].email) {
          callback(201, {
            success: false,
            data: {
              msg: "Email exists",
            },
          });
        } else {
          dbconnection().query(
            "INSERT INTO  users SET ?",
            userData,
            (err, results, fields) => {
              if (err) {
                callback(404, {
                  success: false,
                  data: err,
                });
              } else {
                callback(null, {
                  success: true,
                  data: {
                    msg: "User created",
                  },
                });
              }
            }
          );
        }
      }
    );
  }
};

const deleteUser = (id, callback) => {
  if (dbconnection()) {
    dbconnection().query(
      `SELECT * FROM users WHERE id=${id}`,
      (err, results, fields) => {
        if (err) {
          console.log("No se pudo eliminar");
          callback(
            {
              success: false,
              data: err,
            },
            null
          );
        } else {
          dbconnection().query(
            `DELETE FROM users WHERE id=${id}`,
            (err, results, fields) => {
              if (err) {
                callback({
                  success: false,
                  data: err,
                });
              } else {
                callback(null, {
                  success: true,
                  data: {
                    msg: "User deleted",
                  },
                });
              }
            }
          );
        }
      }
    );
  }
};

module.exports = {
  newUser,
  deleteUser,
};
