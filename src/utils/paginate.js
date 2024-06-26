const DEFAULT_PAGINATION_LIMIT = 150;
const DEFAULT_PAGINATION_OFFSET = 0;

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
