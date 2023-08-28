const Tour = require("../models/dataModel");
const APIFeatures = require("../api_features/api_features");
const AppError = require("../api_features/appError");

exports.getTours = async (req, res, next) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .select()
      .paginate();
    console.log("-------");

    const tours = await features.query; // Execute the Query

    tours = "hi";

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    next(new AppError("Something wrong....", 404));
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
