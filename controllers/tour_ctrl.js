const Tour = require("../models/dataModel");
const APF = require("../api_features/api_features");

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    // 1. FILTERING
    var queryObj = { ...this.queryStr };

    console.log(queryObj);

    // 2. EXCLUDE FIELDS
    const excludeFields = ["page", "sort", "fields", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    console.log(queryObj);

    // 3. Advanced Filtering
    let queryObjStr = JSON.stringify(queryObj);
    queryObjStr = queryObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);

    this.query = this.query.find(JSON.parse(queryObjStr)); // BUILD the QUERY

    return this;
  }

  sort() {
    console.log(this.queryStr);
    // 4. Sorting
    if (this.queryStr.sort) {
      this.query = this.query.sort(this.queryStr.sort.split(",").join(" ")); // Multiple Sorting
    } else {
      this.query = this.query.sort("-createdAt"); // Default Sorting
    }

    return this;
  }

  select() {
    // 5. Selecting the fields
    if (this.queryStr.fields) {
      this.query = this.query.select(this.queryStr.fields.split(",").join(" "));
    } else {
      this.query = this.query.select("-__v"); // Defaul Select
    }

    return this;
  }

  paginate() {
    // 6. Pagination
    let page = this.queryStr.page * 1 || 1;
    let limit = this.queryStr.limit * 1 || 100;

    console.log(page);
    console.log(limit);

    let skip = (page - 1) * limit;

    console.log(skip);

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

exports.getTours = async (req, res) => {
  try {
    // const features = new APF(Tour.find(), req.query)
    //   .filter()
    //   .sort()
    //   .select()
    //   .paginate();

    // const tours = await features.query; // EXECUTE the Query

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .select()
      .paginate();
    console.log("-------");

    const tours = await features.query; // Execute the Query

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.postNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    if (newTour) {
      res.status(201).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
          tours: newTour,
        },
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById({});

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateOneTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "success",
      data: tour,
    });
  } catch (e) {
    res.status(401).json({
      status: "fail",
      message: e,
    });
  }
};

exports.deleteOneTour = (req, res) => {};

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);

  const id = val * 1;
  const tour = tours.find((item) => item.id === id); // db

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};
