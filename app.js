const express = require("express");
const loginRoutes = require("./routes/login");
const app = express();
// const pool = require("./model/db_todo");
const cors = require("cors");
app.use(express.json());

app.options("http://localhost:4200", cors({ origin: "http://localhost:4200" }));
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use("/user", loginRoutes);


app.listen(3001, () => {
  console.log(`app running on port 3001`);
});