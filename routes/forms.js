const express = require("express");
const router = express.Router();

const axios = require("axios");

const paginate = require("../utils/paginate");
const sortByField = require("../utils/sortByField");
const filterData = require("../utils/filterData");
const filterDateByField = require("../utils/filterDateByField");
const filterByFilters = require("../utils/filterByFilters");

router.get("/", function (req, res, next) {
  axios
    .get("/forms")
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

router.get("/:formId/filteredResponses", function (req, res, next) {
  const { limit, offset, sort, afterDate, beforeDate, filters } = req.query;

  axios
    .get(`/forms/${req.params.formId}/submissions`)
    .then(function (response) {
      res.json(
        filterData(
          response.data.responses,
          (_data) =>
            sortByField({
              data: _data,
              field: "submissionId",
              sort,
            }),
          (_data) =>
            filterDateByField({
              data: _data,
              field: "submissionTime",
              afterDate,
              beforeDate,
            }),
          (_data) =>
            filterByFilters({
              data: _data,
              filters: filters === undefined ? [] : JSON.parse(filters),
            }),
          (_data) =>
            paginate({
              data: _data,
              limit: parseInt(limit),
              offset: parseInt(offset),
            })
        )
      );
    })
    .catch(function (error) {
      res.status(500).json("Something went wrong.");
    });
});

module.exports = router;
