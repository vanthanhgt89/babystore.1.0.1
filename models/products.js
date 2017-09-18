const {
    db,
} = require('../pgp')

class Products {
    constructor(db) {
        this.db = db
    }

    generalProduct(status, limit) {
        return this.db.any(`
        SELECT p.name, p.code, p.price, p.sale, i.url 
        FROM product AS p JOIN product_images AS i ON i.product_id = p.id 
        WHERE p.status = $1 LIMIT $2 `, [status, limit])
    }
    getCategoryItemByName(name, status, limit) {
        return this.db.any(`
        SELECT p.id, p.name, p.price, p.sale, p.status, pi.url as images
        FROM product AS p, sub_category AS sc, category AS c, product_images as pi 
        WHERE p.sub_category_id = sc.id 
        AND sc.category_id = c.id 
        AND p.id = pi.product_id 
        AND c.id = (SELECT id FROM category WHERE name = $1) 
        AND p.status = $2 LIMIT $3`, [name, status, limit])
    }
    getCategoryById(id, status, limit) {
        return this.db.any(`
        SELECT c.name as title, p.id, p.name, p.price, p.sale, pi.url, ci.url
        FROM product AS p, sub_category AS sc, category AS c, product_images as pi, category_images AS ci 
        WHERE p.sub_category_id = sc.id 
        AND sc.category_id = c.id 
        AND p.id = pi.product_id AND ci.category_id = c.id 
        AND c.id = $1 
        AND p.status = $2 
        LIMIT $3`, [id, status, limit])
    }
    getProduct(priority, limit) {
        return this.db.any(`
        SELECT c.name, ci.url, ci.position, 
        (array (
             SELECT json_build_object('id', p.id, 'name', p.name, 'price', p.price, 'sale', p.sale, 'image', pi.url) 
                FROM product AS p 
                JOIN product_images AS pi ON pi.product_id = p.id 
                JOIN sub_category AS sc on sc.id = p.sub_category_id 
                JOIN category AS c1 ON c1.id = sc.category_id 
                WHERE pi.priority = $1 AND c.id = sc.category_id LIMIT $2 ) 
            ) as list_product 
        FROM category AS c, category_images as ci 
        WHERE c.id = ci.category_id AND ci.status = 1 
        ORDER BY c.id`, [priority, limit])
    }

    showProduct(limit, offset) {
        return this.db.any(`
        SELECT p.id, p.sale, p.price, p.name, p.code,
        (ARRAY (SELECT json_build_object('url', pi.url) 
        FROM product_images AS pi 
        JOIN product AS p1 ON pi.product_id = p1.id 
        WHERE pi.product_id = p.id ) ) AS images 
        FROM product AS p 
        WHERE p.id in 
            (SELECT pi1.product_id From product as p2 
            JOIN product_images AS pi1 ON pi1.product_id = p2.id 
            GROUP BY pi1.product_id ) ORDER BY p.id LIMIT $1 OFFSET $2`, [limit , offset])
    }

    showProductByIdCategory(id, limit, offset){
        return this.db.any(`
        SELECT p.id, p.sale, p.price, p.name, p.code,
        (ARRAY (SELECT json_build_object('url', pi.url) 
        FROM product_images AS pi 
        JOIN product AS p1 ON pi.product_id = p1.id 
        WHERE pi.product_id = p.id ) ) AS images 
        FROM product AS p 
        JOIN sub_category as sc ON sc.id = p.sub_category_id
        JOIN category as c ON c.id = sc.category_id
        WHERE p.id in 
            (SELECT pi1.product_id From product as p2 
            JOIN product_images AS pi1 ON pi1.product_id = p2.id 
            GROUP BY pi1.product_id )
        AND c.id = $1    
        ORDER BY p.id 
        LIMIT $2
        OFFSET $3`, [id, limit, offset])
    }

    showProductByIdSub_Category(id, limit, offset){
        return this.db.any(`
        SELECT p.id, p.sale, p.price, p.name, p.code,
        (ARRAY (SELECT json_build_object('url', pi.url) 
        FROM product_images AS pi 
        JOIN product AS p1 ON pi.product_id = p1.id 
        WHERE pi.product_id = p.id ) ) AS images 
        FROM product AS p 
        JOIN sub_category as sc ON sc.id = p.sub_category_id
        WHERE p.id in 
            (SELECT pi1.product_id From product as p2 
            JOIN product_images AS pi1 ON pi1.product_id = p2.id 
            GROUP BY pi1.product_id )
        AND sc.id = $1  
        ORDER BY p.id 
        LIMIT $2
        OFFSET $3`, [id, limit, offset])
    }
   
    getProductById(id){
        return this.db.oneOrNone(`
        SELECT * FROM product AS p 
        JOIN product_images AS pi on pi.product_id = p.id
        WHERE p.id = $1`, id)
    }
   



}


module.exports = new Products(db)

