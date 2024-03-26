const DEFAULT_PAGINATION_LIMIT = require("../constants/DEFAULT_PAGINATION_LIMIT.JS");
const DEFAULT_PAGINATION_OFFSET = require("../constants/DEFAULT_PAGINATION_OFFSET");

const paginate = function ({ data, limit, offset }) {
  const resultLimit = isNaN(limit) ? DEFAULT_PAGINATION_LIMIT : limit;
  const totalResponses = data?.length ?? 0;
  const pageCount = Math.ceil(totalResponses / resultLimit);

  const dataOffset = isNaN(offset) ? DEFAULT_PAGINATION_OFFSET : offset;
  const result =
    dataOffset > totalResponses
      ? []
      : data.slice(dataOffset, dataOffset + resultLimit);

  return {
    result,
    totalResponses,
    pageCount,
  };
};

module.exports = paginate;
