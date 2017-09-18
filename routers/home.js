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
const redis = require('promise-redis')(function (resolver) {
    return new Promise(resolver);
});
const client = redis.createClient()

client.on('connect', () => {
    console.log('connected');
})

module.exports = (express) => {
    const router = express.Router()
    router.get('/', (req, res) => {
        client.hkeys('home.....')
            .then(result => {
                console.log(result);
                if (result.length > 0) {
                    client.hgetall('home')
                        .then(data => {
                            res.render('home', {
                                menu: JSON.parse(data.menu),
                                display: JSON.parse(data.display),
                                poster: JSON.parse(data.poster),
                                category: JSON.parse(data.category),
                                generalProduct: JSON.parse(data.generalProduct),
                                listProduct: JSON.parse(data.listProduct)
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })

                } else {
                    db.task(t => {
                            return t.batch([
                                Menu.getMenu(1),
                                Category.getCategory(),
                                Products.generalProduct(1, 6),
                                Products.getProduct(1, 6)
                            ])
                        })

                        .then(data => {
                            // console.log(data[0]);
                            let display = data[0].filter(item => item.id === 1),
                                poster = display[0].banner.filter(item => item.position === 'middle')
                            // console.log(poster);
                            // console.log(display[0].banner);
                            data[2].forEach(item => {
                                item.sale = (item.price * (100 - item.sale)) / 100
                                item.sale = priceConver(item.sale)
                                item.price = priceConver(item.price)
                            })
                            data[3].forEach(item => {
                                // console.log(item.list_product);
                                item.list_product.forEach(item1 => {
                                    item1.sale = (item1.price * (100 - item1.sale)) / 100
                                    item1.sale = priceConver(item1.sale)
                                    item1.price = priceConver(item1.price)
                                    item1.path = getSlug(item1.name + '-' + item1.id, {lang: 'vn'})
                                    console.log(item1.path);
                                })
                            })
                            // console.log(data[3]);
                            client.hdel('display-data', 'menu', 'display', 'poster', 'category', 'generalProduct', 'listProduct')
                            client.hmset('display-data', 'menu', JSON.stringify(data[0]), 'display', JSON.stringify(display[0].banner), 'poster', JSON.stringify(poster), 'category', JSON.stringify(data[1]), 'generalProduct', JSON.stringify(data[2]), 'listProduct', JSON.stringify(data[3]))
                            client.expire('dispay-data', 5)
                            res.render('home', {
                                menu: data[0],
                                display: display[0].banner,
                                poster: poster,
                                category: data[1],
                                generalProduct: data[2],
                                listProduct: data[3]
                            })
                        })
                        .catch(err => {
                            throw new Error('Task error')
                        })
                }
            })
            .catch(err => {
                throw new Error('Error redis')
            })

    })

    router.post('/category', (req, res) => {
        let key = req.body.name,
            id = req.body.item
        // console.log(req.body.name);
        client.hexists(key, id)
            .then(result => {
                if (result) {
                    // console.log(result);
                    client.hmget(key, id)
                        .then(result => {
                            let data = JSON.parse(result)
                            data.forEach(item => {
                                item.sale = (item.price * (100 - item.sale)) / 100
                                item.sale = priceConver(item.sale)
                                item.price = priceConver(item.price)
                            })
                            res.json({
                                product: data
                            })
                        })
                        .catch(err => {
                            throw new Error('Caching err')
                        })

                } else {
                    Products.getCategoryItemByName(key, 1, 6)
                        .then(data => {
                            data.forEach(item => {
                                item.sale = (item.price * (100 - item.sale)) / 100
                                item.sale = priceConver(item.sale)
                                item.price = priceConver(item.price)
                            })
                            client.hmset(key, id, JSON.stringify(data))
                            client.expire(key, 3000)
                            res.json({
                                product: data
                            })
                        })
                        .catch(err => {
                            res.json({
                                message: 'Product not found'
                            })
                        })
                }
            })
    })


    return router
}