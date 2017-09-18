$(document).ready(() => {

    $('#get-sign').click(e => {
        e.preventDefault()
        $('.wssignup-w').css('display', 'none')
        let formData = $('#form-login').serialize()
        console.log(formData);
        axios.post('/login', formData)
            .then(res => {
                console.log(res);
                if (res.data.user) {
                    location.reload()
                } else {
                    $('.wssignup-w').css('display', 'block')
                    $('.wssignup-w').text(res.data)
                }

            })
            .catch(err => {
                $('.wssignup-w').css('display', 'block')
                $('.wssignup-w').text(res.data)
            })
    })
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
                        html += `<div class="col-xs-6 col-sm-2 col-md-2"> <div class="container-item"> <img src="/image/img/${product[i].url}" alt="item.name" class="img-responsive"> <div class="description" ><div class="name"> <span> ${product[i].name} </span> </div> <div class="price"> <ins>${product[i].sale}đ</ins> <del> ${product[i].price}đ</del> </div> </div><div class="icon"> <i class="fa fa-heart-o" aria-hidden="true"></i> <i class="fa fa-cart-arrow-down" aria-hidden="true"></i> </div> </div> </div>`
                                
                            }
                        $('#'+ id).append(html)
                        } 
                    })
                    .catch(err => {
                        console.log('sao lai chay vao day');
                    })

        })
    })

})