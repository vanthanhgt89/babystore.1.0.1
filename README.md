# babystore.1.0.1

### Công việc đã làm
* config passport 
```js
app.use(session({
    cookie: {
        maxAge: (3600 * 1000)
    },
    unser: 'destroy',
    secret: 'cart',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.login = true;
        req.session.user = req.user;
    } else {
        req.session.login = false;
        req.session.user = {};
        // console.log(req.session.user);
    }
    next();
});
// =========== passport ======== 
app.use(passport.initialize())
app.use(passport.session())

```
* Đăng nhập bằng passport dùng axois từ client request lên server
```js
  $('#post-register').click((e) => {
        e.preventDefault()
        $('.wsregister-w').css('display', 'none')
        let formData = $('#form-register').serialize()
        console.log(formData);
        axios.post('/register', formData)
            .then(res => {
                console.log(res)
                if (res.data.user) {
                    location.reload()
                } else {
                    $('.wsregister-w').css('display', 'block')
                    $('.wsregister-w').text(res.data.message)
                }
            })
            .catch(err => {
                $('.wsregister-w').css('display', 'block')
                $('.wsregister-w').text(res.data.message)
            })
    })

```

* Reder xong homePage
* Dùng axois tối ưu tốc độ khi load nhiều dữ liệu chưa cần thiết hiện thị
  * VD: chuyển trang, phân các tap khi có event mới thực hiện load trang
  ```js
  
    $('.productItem').each(function (index) {
        $(this).click((e) => {
            e.preventDefault()
            let name = $(this).text(),
                id = $(this).attr('data-name')

            $('#'+id).html('')
            let html = ''
                axios.post('/category', {
                        name: name,
                        item: id
                    })
                    .then(res => {
                        if (res.data.product) {
                            console.log(res);
                            // console.log(res.data.product);
                            let product = res.data.product
                            console.log(product.length);
                            for(let i = 0; i < product.length; i++) {
                                // console.log(i);
                                html += '<div class="col-xs-6 col-sm-2 col-md-2"> <div class="container-item"> <img src="/image/img/'+ product[i].url + '" alt="item.name" class="img-responsive"> <div class="description" ><div class="name"> <span> '+ product[i].name + ' </span> </div> <div class="price"> <ins>'+ product[i].sale + 'đ</ins> <del>'+ product[i].price + 'đ</del> </div> </div><div class="icon"> <i class="fa fa-heart-o" aria-hidden="true"></i> <i class="fa fa-cart-arrow-down" aria-hidden="true"></i> </div> </div> </div>'
                            }
                        $('#'+ id).append(html)
                        } 
                    })
                    .catch(err => {
                        console.log('sao lai chay vao day');
                    })
        })
    })

  
  ```
*  
