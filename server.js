const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log("Cannot connect to database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Hi from Custom Tables!",
  });
});

require("./app/routes/table.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
