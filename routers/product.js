const {
    db,
} = require('../pgp')
const Menu = require('../models/menus')
const Category = require('../models/category')
const Banner = require('../models/banner')
const Products = require('../models/products')
const priceConver = require('../models/priceConver')
const Promise = require("bluebird")
const getSlug = require('speakingurl')
const ids = require('short-id')
ids.configure({
    length: 6, // The length of the id strings to generate 
    algorithm: 'sha1', // The hashing algoritm to use in generating keys 
    salt: Math.random // A salt value or function 
});
const redis = require('promise-redis')(function (resolver) {
    return new Promise(resolver);
});
const client = redis.createClient()

client.on('connect', () => {
    console.log('connected');
})

module.exports = (express) => {
    const router = express.Router()
    router.get('/san-pham', (req, res) => {
        client.hkeys('display-data')
            .then(result => {
                // console.log(result);
                db.task(t => {
                        return t.batch([
                            Menu.getMenu(1),
                            Category.getCategory(1),
                            Products.showProduct(12, 0)
                        ])
                    })
                    .then(data => {
                        let display = data[0].filter(item => item.id === 3)
                        data[1].forEach(item => {
                            item.path = getSlug(item.name + '-' + item.id, {
                                lang: 'vn'
                            })
                            item.sub_category.forEach(item1 => {
                                item1.path = getSlug(item1.name + '-' + item1.id, {
                                    lang: 'vn'
                                })
                            })
                        })
                        data[2].forEach(item => {
                            item.sale = (item.price * (100 - item.sale)) / 100
                            item.sale = priceConver(item.sale)
                            item.price = priceConver(item.price)
                            item.path = getSlug(item.name + '-' + item.code, {
                                lang: 'vn'
                            })
                        })
                        // console.log(data[2]);
                        res.render('product', {
                            menu: data[0],
                            display: display[0].banner,
                            category: data[1],
                            product: data[2]
                        })
                    })
            })
            .catch(err => {
                throw new Error('err data from redis')
            })
    })
    router.get('/category/:category', (req, res) => {
        console.log(req.params);
        let title = req.params.category,
            index = title.lastIndexOf('-'),
            code = title.slice(index + 1, title.length)
        console.log(code);

        db.task(t => {
                return t.batch([
                    Menu.getMenu(1),
                    Category.getCategory(1),
                    Products.showProductByIdCategory(code, 12, 0)
                ])
            })
            .then(data => {
                let display = data[0].filter(item => item.id === 3)
                data[1].forEach(item => {
                    item.path = getSlug(item.name + '-' + item.id, {
                        lang: 'vn'
                    })
                    item.sub_category.forEach(item1 => {
                        item1.path = getSlug(item1.name + '-' + item1.id, {
                            lang: 'vn'
                        })
                    })
                })
                data[2].forEach(item => {
                    item.sale = (item.price * (100 - item.sale)) / 100
                    item.sale = priceConver(item.sale)
                    item.price = priceConver(item.price)
                    item.path = getSlug(item.name + '-' + item.code, {
                        lang: 'vn'
                    })
                })
                // console.log(data[2]);
                res.render('product', {
                    menu: data[0],
                    display: display[0].banner,
                    category: data[1],
                    product: data[2]
                })
            })
            .catch(err => {
                throw new Error('err from /:category')
            })

    })

    router.get('/sub_category/:sub_category', (req, res) => {
        console.log(req.params);
        let title = req.params.sub_category,
            index = title.lastIndexOf('-'),
            code = title.slice(index + 1, title.length)
        console.log(code);
        db.task(t => {
                return t.batch([
                    Menu.getMenu(1),
                    Category.getCategory(1),
                    Products.showProductByIdSub_Category(code, 12, 0)
                ])
            })
            .then(data => {
                let display = data[0].filter(item => item.id === 3)
                data[1].forEach(item => {
                    item.path = getSlug(item.name + '-' + item.id, {
                        lang: 'vn'
                    })
                    item.sub_category.forEach(item1 => {
                        item1.path = getSlug(item1.name + '-' + item1.id, {
                            lang: 'vn'
                        })
                    })
                })

                console.log(data[2]);

                res.render('product', {
                    menu: data[0],
                    display: display[0].banner,
                    category: data[1],
                    product: data[2]
                })

            })
            .catch(err => {
                throw new Error('err from sub_category')
            })
    })


    router.get('/san-pham/:title', (req, res) => {
        // console.log(req.params);
        let title = req.params.title,
            index = title.lastIndexOf('-'),
            // console.log(index);
            id = title.slice(index + 1)
        db.task(t => {
            return t.batch([
                    Menu.getMenu(1),
                    Category.getCategory(1)

                ])

                .then(data => {
                    let display = data[0].filter(item => item.id === 8)
                    res.render('detail', {
                        menu: data[0],
                        display: display[0].banner,
                        category: data[1],
                    })
                })
        })
    })


    return router
}