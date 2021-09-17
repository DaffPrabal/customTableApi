const db = require("../models");
const header = db.header;
const filter = db.filter;
const worker = db.workers;
const user = db.user;

exports.sendAllWorkersList = async (req, res) => {
  let head;
  let filt;
  let allData;
  if (!req.body.class) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let start = req.body.start ? req.body.start : 0;
  let limit = req.body.limit ? req.body.limit : 10;
  let sort = req.body.sort;
  let findFilter = req.body.filter;
  let classname = req.body.class;
  let findCondition = {};
  let sortCondition = {};
  const arr = [];
  const regarr = [];
  if (req.body.filter.length) {
    for (let i = 0; i < findFilter.length; i++) {
      let cond = findFilter[i];
      let conditionHeader = cond.header;
      let conditionValue = cond.value;
      if (conditionValue !== "") {
        let obj = {};
        if (
          conditionValue != true &&
          conditionValue != false &&
          conditionHeader.indexOf("Date") < 1
        ) {
          let regobj = {};
          let temphe = conditionHeader + ".value";
          regobj[temphe] = {
            $regex: new RegExp(conditionValue),
            $options: "i",
          };
          regarr.push(regobj);
        } else if (conditionValue == true || conditionValue == false) {
          let temph = conditionHeader + ".value";
          obj[temph] = conditionValue;
        } else if (conditionHeader.indexOf("Date")) {
          let temp = conditionHeader + ".value";
          obj[temp] = {
            $gte: new Date(conditionValue.startDate),
            $lte: new Date(conditionValue.endDate),
          };
        }
        arr.push(obj);
        if (regarr.length) {
          arr.push({ $or: regarr });
        }
      }
    }
  }
  console.log(arr);
  findCondition = req.body.filter.length
    ? {
        $and: arr,
      }
    : {};
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
    if (classname === "workerList") {
      allData = await worker.find(findCondition).sort(sortCondition).exec();
      tableData = await worker
        .find(findCondition)
        .sort(sortCondition)
        .skip(start)
        .limit(limit)
        .exec();
    } else if (classname === "userList") {
      allData = await user.find(findCondition).sort(sortCondition).exec();
      tableData = await user
        .find(findCondition)
        .sort(sortCondition)
        .skip(start)
        .limit(limit)
        .exec();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Erorr in list",
    });
  }
  console.log(tableData);
  customObject = {
    class: classname,
    headerToShow: head[0],
    filter: filt,
    metaData: allData.length,
    tableData: tableData,
  };
  res.json(customObject);
};
