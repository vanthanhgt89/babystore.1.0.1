$(document).ready(function () {


  $("#zoom_03").elevateZoom({
    zoomType: "inner",
    cursor: "crosshair"
  });

  $('.list-item').hover(function () {
    $('#introduce').css('visibility', 'hidden');
    $('.shop-button').css('visibility', 'hidden')
  }, function () {
    $('#introduce').css('visibility', 'visible');
    $('.shop-button').css('visibility', 'visible')
  });

  $('.container-item1').hover(function () {
    $('.text-l').typed({
      strings: ['Bố mẹ đang tìm quần áo cho bé ?'],
      typeSpeed: 0
    })
    $('.typed-cursor').css('display', 'none');
  })

  $('.carousel').carousel({
    interval: false
  })

  function couterHeart() {
    $('.couter-heart').each(function () {
      $(this).click(function () {
        var couter = $('.couter2').html();
        couter++;
        $('.couter2').html(couter);
        $(this).off();
      })
    });
  }

  function couterCart() {
    $('.couter-cart').each(function () {
      $(this).click(function () {
        var couter = $('.couter2').html();
        couter++;
        $('.couter1').html(couter);
        $(this).off();
      })
    });
  }
  couterHeart();
  couterCart();


  $(".back-top").click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 'slow');
    return false;
  });

  $("#go-about").click(function () {
    $('html,body').animate({
      scrollTop: 1000
    }, 'slow');
    return false;
  });
  $('.btn-payment').click(function () {
    $('#quickbuy').modal('hide');
    $('html,body').animate({
      scrollTop: 0
    }, 'slow');
  });

  $(window).scroll(function () {
    let wScroll = $(this).scrollTop();


    if (wScroll > 0 && wScroll < 100) {
      $('#introduce').typed({
        strings: ['Baby store xin chào quý khách </br> bố mẹ muốn mua gì cho con ?'],
        typeSpeed: 0
      })
      $('#product').typed({
        strings: ['Trang chủ / Sản phẩm</br>Sản phẩm của Babystore '],
        typeSpeed: 0
      })
      $('#blog').typed({
        strings: ['Trang chủ / Blog</br>'],
        typeSpeed: 0
      })
      $('#information').typed({
        strings: ['Trang chủ / Giới thiệu </br>Về Babystore '],
        typeSpeed: 0
      })
    }

    if (wScroll > 500) {
      $('.back-top').fadeIn('slow');
    } else {
      $('.back-top').fadeOut('slow');
    }


    let html = $('#about').html();
    if (html) {

      let lScroll = $('#about').offset().top;
      if (wScroll > lScroll - $(window).height() / 2) {
        $('.about-img-large').css('background-position', '40% ' + (wScroll - lScroll) + 'px')
        let opacity = (wScroll - lScroll + 350) / (wScroll / 1.7);
        $('.about-img-item').css({
          'opacity': opacity
        });
      }
    }

  })

})