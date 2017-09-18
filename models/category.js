const {db, }  = require('../pgp')

class Category{
    constructor(db){
        this.db = db
    }

    getCategory(){
        return this.db.any("SELECT c.*, ( array( SELECT json_build_object('id', sc.id, 'name', sc.name) FROM sub_category AS sc WHERE sc.status = 1 AND sc.category_id = c.id ) )AS sub_category FROM category AS c WHERE c.status = 1 ORDER BY c.id")
    }

}

module.exports = new Category(db)