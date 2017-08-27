const {
    db,
} = require('../pgp')
// module bam va check password
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = (express, passport) => {
    const router = express.Router()
    router.get('/login', (req, res) => {
        let message = '';
        if (req.session.flash) {
            message = req.session.flash.error.length > 0 ? req.session.flash.error[0] : '';
        }
        // console.log(req.session);
        req.session.flash = '';
        res.json(message)
    });

    router.post('/login',
        passport.authenticate('local', {
            // successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }), (req, res) => {
            // console.log('username');
            // console.log(req.user);
            res.json({
                user: req.user.username
            })
        }
    );

    router.post('/register', (req, res) => {
        console.log(req.body);

        User.findByNameUser(req.body.username)
        .then(data => {
            if(data){
                res.json('Tk da ton tai')
            }else{
                bcrypt.hash(req.body.password, 5, (err, hash) => {
                    User.insertNewUser(req.body.username, hash, req.body.fullname, req.body.phone)
                    .then(data => {
                        res.json({message: 'Dang ky thanh cong'})
                    })
                    .catch(err => {
                        res.json({message: 'Dang ky that bai'})
                    })
                })
            }
        })    

    })


    return router
}