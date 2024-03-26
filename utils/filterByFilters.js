const filterByFilters = function ({ data, filters }) {
  if (!data?.length || !filters?.length) return data;

  return data.filter((_data) =>
    _data.questions?.every(
      (question) => {
        const questionFilter = filters.find(
          (filter) => filter.id === question.id
        );
        if (!questionFilter) return true;

        switch (questionFilter.condition) {
          case "equals":
            return question.value === questionFilter.value;
          case "does_not_equal":
            return question.value !== questionFilter.value;
          case "greater_than":
            return question.value > questionFilter.value;
          case "less_than":
            return question.value < questionFilter.value;
          default:
            return true;
        }
      }
    )
  );
};

module.exports = filterByFilters;
