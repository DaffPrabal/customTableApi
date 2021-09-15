const db = require("../models");
const header = db.header;
const filter = db.filter;
const worker = db.workers;

exports.sendAllWorkersList = async (req, res) => {
  console.log(req);
  let head;
  let filt;
  let allData;
  // if (!req.body.class) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }
  let start = req.body.start ? req.body.start : 0;
  let limit = req.body.limit ? req.body.limit : 10;
  let sort = req.body.sort;
  let classname = req.body.class;
  let findCondition = {};
  let sortCondition = {};

  if (sort.property) {
    let order = sort.order === "asc" ? 1 : -1;
    sortCondition[sort.property] = order;
  } else {
    sortCondition = { "joining Date.value": 1 };
  }

  try {
    head = await header.find({ class: classname }).exec();
  } catch (err) {
    return res.status(400).json({
      error: "Erorr in header",
    });
  }
  try {
    filt = await filter.find({ class: classname }).exec();
  } catch (err) {
    return res.status(400).json({
      error: "Erorr in filter",
    });
  }
  try {
    allData = await worker.find(findCondition).sort(sortCondition).exec();
    tableData = await worker
      .find(findCondition)
      .sort(sortCondition)
      .skip(start)
      .limit(limit)
      .exec();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Erorr in list",
    });
  }
  customObject = {
    class: classname,
    headerToShow: head[0],
    filter: filt,
    metaData: allData.length,
    tableData: tableData,
  };
  res.json(customObject);
};
