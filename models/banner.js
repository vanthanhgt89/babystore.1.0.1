const {db, } = require('../pgp')

class Banner {
    constructor(db){
        this.db = db
    }

    getTopBanner(id){
        return this.db.any('SELECT banner.url, banner.position, menu.name FROM banner JOIN menu on menu.id = banner.menu_id WHERE banner.menu_id = $1 ORDER BY banner.id', id)
    }
    getAbout(position){
        return this.db.one('SELECT banner.name, banner.url, banner.description FROM banner JOIN menu on menu.id = banner.menu_id WHERE banner.position = $1 ORDER BY banner.id', position)
    }
    
}

module.exports = new Banner(db)