require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const connectDB = require("./Config/db");
const taskRoutes = require("./Routes/taskRoutes");
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Servidor corriendo con swagger http://localhost:${PORT}/api-docs`
  );
});

module.exports = app;
