const {db, } = require('./pgp')

db.one("INSERT INTO public.product(sub_category_id, name, code, trademark, rate, price, sale, description, content, quanlity, status) VALUES (1, 'Bộ thun bé trai ngắn Lebe', '1-1-0001', 'Thái lan', 4, 150000, 5 , 'sản phẩm...', 'nôi dụng sản phẩm', 10, 1)")
.then(data => {
  console.log(data);
})