const express = require("express");
const cors = require("cors");
const { handleErrors } = require("./errors/handleErrors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

app.use(handleErrors);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
