const {db, } = require('../pgp')
class Menu {
    constructor(db){
        this.db = db
    }

    getMenu(status){
        return this.db.any('SELECT * FROM menu WHERE status = $1 AND priority <= 6 ORDER BY ID ', status)
    }
    
}



module.exports = new Menu(db)