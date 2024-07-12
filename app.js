const express = require("express");
const loginRoutes = require("./routes/login");
// const adminRoute = require("./routes/");
// const doctorRoute = require("./routes/doctor");
const app = express();
// const pool = require("./model/db_todo");
// const cors = require("cors");
app.use(express.json());

// app.options("http://localhost:3000", cors({ origin: "http://localhost:3000" }));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use("/user", loginRoutes);
// app.use("/admin", adminRoute);
// app.use("/doctor", doctorRoute);

app.listen(3001, () => {
  console.log(`app running on port 3001`);
});