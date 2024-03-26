const filterDateByField = function ({ data, afterDate, beforeDate, field }) {
  if ((afterDate === undefined && beforeDate === undefined) || !data?.length)
    return data;

  const parsedAfterDate = Date.parse(afterDate);
  const parsedBeforeDate = Date.parse(beforeDate);

  return data?.filter((_data) => {
    const dateFieldValue = Date.parse(_data[field]);
    let invalid = false;

    if (!isNaN(parsedAfterDate)) {
      invalid = dateFieldValue < parsedAfterDate;
    }

    if (!isNaN(parsedBeforeDate) && !invalid) {
      invalid = dateFieldValue > parsedBeforeDate;
    }

    return !invalid;
  });
};

module.exports = filterDateByField;
