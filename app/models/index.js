const dbconfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;
db.filter = require("./filterschema.model.js")(mongoose);
db.header = require("./headerschema.model.js")(mongoose);
db.workers = require("./workersschema.model.js")(mongoose);
db.user = require("./userschema.model.js")(mongoose);
module.exports = db;
