const filterData = function (data, ...filterFns) {
  return filterFns.reduce(
    (filteredData, filterFn) => filterFn(filteredData),
    data
  );
};

module.exports = filterData;
