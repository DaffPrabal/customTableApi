const db = require("../models");
const header = db.header;
const filter = db.filter;
const worker = db.workers;

exports.sendAllWorkersList = async (req, res) => {
  let head;
  let filt;
  let allData;
  let start = req.body.start ? req.body.start : 0;
  let limit = req.body.limit ? req.body.limit : 10;
  let sortProperty = req.body.sort.property;
  let sortOrder = req.body.sort.order;
  let classname = req.body.class;
  let findCondition = {};
  let sortCondition = {};
  if (!req.body.class) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  } else {
    findCondition["class"] = classname;
  }

  if (sortProperty && sortOrder) {
    let temp = sortProperty + ".value";
    if (sortOrder === "asc") {
      sortCondition[temp] = 1;
    } else {
      sortCondition[temp] = -1;
    }
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
    headerToShow: head,
    filter: filt,
    metaData: allData.length,
    tableData: tableData,
  };
  res.json(customObject);
};
