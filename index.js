const express = require("express");
const morgan = require("morgan");
require("dotenv").config();


//Create express server
const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
