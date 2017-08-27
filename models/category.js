const {db, }  = require('../pgp')

class Category{
    constructor(db){
        this.db = db
    }

    getCategory(status){
        return this.db.any('SELECT * FROM category WHERE status = $1 ORDER BY ID', status)
    }

    getSubCategory(status) {
        return this.db.any('SELECT sub.* FROM sub_category AS sub JOIN category on category.id = sub.category_id WHERE sub.status = $1', status)
    }
}

module.exports = new Category(db)