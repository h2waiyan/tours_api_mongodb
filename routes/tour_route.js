const express = require("express");
const tourCtrl = require("../controllers/tour_ctrl");

const tourRouter = express.Router();

tourRouter.route("/").get(tourCtrl.getTours).post(tourCtrl.postNewTour);
tourRouter.route("/top-5-cheap").get(tourCtrl.aliasTopTour, tourCtrl.getTours);
tourRouter
  .route("/:id")
  .get(tourCtrl.getOneTour)
  .patch(tourCtrl.updateOneTour)
  .delete(tourCtrl.deleteOneTour);

// tourRouter.param("id", tourCtrl.checkId);

module.exports = tourRouter;
