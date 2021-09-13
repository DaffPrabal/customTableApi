const db = require("../models");
const header = db.header;
const filter = db.filter;
const worker = db.workers;

exports.sendAllWorkersList = async (req, res) => {
  let head;
  let filt;
  let tableData;
  let finalData = [];
  let projection = { name: 1, status: 1, description: 1, "joining Date": 1 };
  let condition = {};
  try {
    head = await header.find({ class: "workerList" }).exec();
  } catch (err) {
    return res.status(400).json({
      error: "Erorr in header",
    });
  }
  try {
    filt = await filter.find({ class: "workerList" }).exec();
  } catch (err) {
    return res.status(400).json({
      error: "Erorr in filter",
    });
  }
  try {
    tableData = await worker.find(condition, projection).exec();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Erorr in list",
    });
  }
  customObject = {
    class: "workerList",
    headerToShow: head[0],
    filter: filt,
    tableData: tableData,
  };
  res.json(customObject);
};
