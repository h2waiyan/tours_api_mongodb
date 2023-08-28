class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    // 1. FILTERING
    var queryObj = { ...this.queryStr };

    // 2. EXCLUDE FIELDS
    const excludeFields = ["page", "sort", "fields", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 3. Advanced Filtering
    let queryObjStr = JSON.stringify(queryObj);
    queryObjStr = queryObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);

    this.query = this.query.find(JSON.parse(queryObjStr)); // BUILD the QUERY

    return this;
  }

  sort() {
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

    let skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
