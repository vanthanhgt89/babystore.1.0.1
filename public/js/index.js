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

  $('.carousel').carousel({
    interval: false
  })

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
      $('#b-text-1').typed({
        strings: ['Baby store xin chào quý khách </br> bố mẹ muốn mua gì cho con ?'],
        typeSpeed: 0
      })
      $('#b-text-3').typed({
        strings: ['Trang chủ / Sản phẩm</br>Sản phẩm của Babystore '],
        typeSpeed: 0
      })
      $('#b-text-4').typed({
        strings: ['Trang chủ / Blog</br>'],
        typeSpeed: 0
      })
      $('#b-text-2').typed({
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