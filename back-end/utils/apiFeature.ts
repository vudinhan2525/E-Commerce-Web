class APIFeature {
    query: any;
    queryString: any;

    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = { ...this.queryString };
        const exFields = ['sort', 'fields', 'limit', 'page'];
        exFields.map((el) => delete queryObj[el]);
        if (queryObj?.type?.in) {
            queryObj.type.in = queryObj.type.in.split(',');
        }
        //advanced filter
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match: string) => `$${match}`,
        );
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const queryStr = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(queryStr);
        }
        return this;
    }
    fields() {
        if (this.queryString.fields) {
            const queryStr = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(queryStr);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
export default APIFeature;
