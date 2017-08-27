const {db,} = require('../pgp')

class User {
    constructor(db){
        this.db = db
    }

    insertNewUser(username, password, fullname, phone){
        return this.db.one('INSERT INTO user_account (username, password, fullname, phone) VALUES ($1, $2, $3, $4) RETURNING * ', [username, password, fullname, phone])
    }

    findByNameUser(username){
        return this.db.oneOrNone('SELECT * FROM user_account WHERE username = $1', username)
    }
    findByIdUser(id){
        return this.db.oneOrNone('SELECT * FROM user_account WHERE id = $1', id)
    }


}

module.exports = new User(db)