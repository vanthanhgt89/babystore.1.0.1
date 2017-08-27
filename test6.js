const {
    db,
} = require('./pgp')
const Menu = require('./models/menus')
const Products = require('./models/products')
const priceConver = require('./models/priceConver')


const Promise = require("bluebird")
const redis = require('promise-redis')(function (resolver) {
    return new Promise(resolver);
});
const client = redis.createClient()

db.task(t => {
        return t.batch([
            Menu.main_menu(),
            Menu.sub_menu(),
            Products.generalProductTop(6),
            Products.productTop(3, 6),
            Products.productTop(1, 6),
            Products.productTop(2, 6),
            Products.productTop(4, 6),
        ])
    })
    .then(data => {
        // console.log(data[0]);
        let datas = []
        data.forEach((item, index) => {
            if (index >= 2) {
                item.forEach(eachProduct => {
                    eachProduct.price = priceConver(eachProduct.price)
                })
                datas.push({
                    key: `item${index - 1}`,
                    data: item
                })
            }
        })
        client.hmset('key1', 'menu', JSON.stringify(data[0]), 'menu1', JSON.stringify(data[2]), 'products', JSON.stringify(datas))
        client.hmset('key2', {
            'menu': '1',
            'title': 2
        })


        // client.hgetall('key1').then(result => {
        //         // console.log(result);
        //         console.log(result.products);
        //         // console.log(JSON.parse(result.menu));
        //         // console.log(result.memu);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })


        // client.hexists('key1','menu').then(result => {
        //     if (result) console.log('true');
        //     else console.log('false');
        // })
        client.hkeys('key1').then(result => {
            console.log(result);
            if(result) console.log('true');
        })

    })