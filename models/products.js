const {db, } = require('../pgp')

class Products{
    constructor(db){
        this.db = db
    }

    generalProduct(status, n){
        return this.db.any('SELECT p.name, p.code, p.price, p.sale, i.url FROM product AS p JOIN product_images AS i ON i.product_id = p.id WHERE p.status = $1 LIMIT $2 ', [status, n])
    }
    getCategory(){
        return this.db.any('SELECT * FROM category ORDER BY id')
    }
    getCategoryItemByName(name, status, n){
        return this.db.any('SELECT p.id, p.name, p.price, p.sale, p.status, pi.url FROM product AS p, sub_category AS sc, category AS c, product_images as pi WHERE p.sub_category_id = sc.id AND sc.category_id = c.id AND p.id = pi.product_id AND c.id = (SELECT id FROM category WHERE name = $1) AND p.status = $2 LIMIT $3', [name, status, n])
    }
    getCategoryById(id, status, n){
        return this.db.any('SELECT c.name as title, p.id, p.name, p.price, p.sale, pi.url, ci.url AS poster FROM product AS p, sub_category AS sc, category AS c, product_images as pi, category_images AS ci WHERE p.sub_category_id = sc.id AND sc.category_id = c.id AND p.id = pi.product_id AND ci.category_id = c.id AND c.id = $1 AND p.status = $2 LIMIT $3', [id, status, n])
    }
    getProduct(status, n){
        return this.db.any("SELECT c.name, ci.url, (array ( SELECT json_build_object('name', p.name, 'price', p.price, 'sale', p.sale, 'image', pi.url) FROM product AS p JOIN product_images AS pi ON pi.product_id = p.id JOIN sub_category AS sc on sc.id = p.sub_category_id JOIN category AS c1 ON c1.id = sc.category_id WHERE p.status = 1 AND c.id = sc.category_id LIMIT $2 ) ) as list_product FROM category AS c, category_images as ci WHERE c.id = ci.category_id ORDER BY c.id", [status, n])
    }
    // getCategoryItem(status, n){
    //     return this.db.any('SELECT category.name AS title, (array(SELECT row_to_json(p) FROM product AS p JOIN sub_category AS sc on sc.id = p.sub_category_id WHERE sc.category_id = category.id AND p.status = $1 LIMIT $2)) as PRODUCT FROM category ORDER BY ID', [status, n])
    // }

    
   

}


module.exports = new Products(db)
// SELECT p.product_code, 
// (
// array(
//     SELECT row_to_json(p1)
//     FROM product as p1
// 	WHERE p1.product_code = p.product_code
// 	) 
// )as products
// FROM product as p
// WHERE p.product_code IN ('T0001', 'T0010')
// GROUP BY p.product_code

// SELECT pl.title, 
// (
// array(
//     SELECT row_to_json(p)
//     FROM product as p
// 	WHERE p.type_product = pl.type_product
// 	) 
// )as products
// FROM product_list as pl
// WHERE pl.type_product in (1)