const {
    db,
} = require('../pgp')
const Menu = require('../models/menus')
const Category = require('../models/category')
const Banner = require('../models/banner')
const Products = require('../models/products')
const priceConver = require('../models/priceConver')
const Promise = require("bluebird")
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
        
        db.task(t => {
            return t.batch([
                    Menu.getMenu(1),
                    Category.getCategory(1),
                    Category.getSubCategory(1),
                    Banner.getTopBanner(1),
                    Banner.getAbout('about'),
                    Products.getCategory(),
                    Products.generalProduct(1, 6),
                    Products.getProduct(1, 6)
                ])
                .then(data => {

                    console.log(data[7]);
                    data[7].forEach(item => {
                        console.log(item.list_product);
                        item.list_product.forEach(item1 => {
                            console.log(item1);
                        })
                    })
                    let middle = data[3].filter(item => item.position == 'middle')
                    
                    res.render('home', {
                        menu: data[0],
                        category: data[1],
                        sub_category: data[2],
                        banner: data[3],
                        about: data[4],
                        category: data[5],
                        generalProduct: data[6],
                        midBanner: middle,
                        listProduct: data[7]
                    })

                })
                .catch(err => {
                    throw new Error('Task error')
                })
        })
    })

    router.post('/category', (req, res) => {
        let key = req.body.name,
            id = req.body.item
        console.log(req.body.name);
        client.hexists(key, id)
            .then(result => {
                if (result) {
                    console.log(result);
                    client.hmget(key, id)
                        .then(result => {
                            console.log(result);
                            // res.json(JSON.parse(result.id))
                            res.json({product : JSON.parse(result)})
                        })
                        .catch(err =>{
                            throw new Error('Caching err')
                        })

                } else {
                    Products.getCategoryItemByName(key, 1, 6)
                        .then(data => {
                            client.hmset(key, id, JSON.stringify(data))
                            client.expire(key, 100)
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