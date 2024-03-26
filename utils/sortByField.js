const sortByField = function ({ data, field, sort }) {
  return data.sort((a, b) => {
    if ((typeof a[field] || typeof b[field]) === "string") {
      if (sort === "desc") {
        return b[field].localeCompare(a[field]);
      }

      return a[field].localeCompare(b[field]);
    }

    if (sort === "desc") {
      return b[field] - a[field];
    }

    return a[field] - b[field];
  });
};

module.exports = sortByField;
