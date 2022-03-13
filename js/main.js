var scrollFlg = true;
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4.5,
  spaceBetween: 0,
  freeMode: true,
});

var scroll = $("window").scrollTop() + 50;
scrollProcess(scroll);

$(window).on("scroll", function (event) {
  if (!scrollFlg) {
    return;
  }
  var scroll = $(this).scrollTop() + 50;
  //ヘッダーの高さ
  scrollProcess(scroll);
});

$(".swiper-slide a").on("click", function () {
  scrollFlg = false;
  $(".swiper-slide a").removeClass("active");
  $(this).addClass("active");
  setTimeout(function () {
    scrollFlg = true;
  }, 1000);
});

function scrollProcess(scroll) {
  var contents = [];
  $(".swiper-slide a").each(function (i, v) {
    var id = $(v).attr("href");
    contents.push({
      index: i,
      id: id,
      top: $(id).offset().top,
      height: $(id).outerHeight(),
    });
  });
  var findResult = contents.find(function (c) {
    return scroll >= c.top && scroll < c.top + c.height;
  });
  if (findResult === undefined) {
    return;
  }
  $(".swiper-slide a").removeClass("active");
  var dom = $('.swiper-slide a[href="' + findResult.id + '"]');
  dom.addClass("active");
  swiper.slideTo(findResult.index);
}
