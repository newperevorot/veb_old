/******* ЯНДЕКС КАРТЫ API ********/
// ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("map", {
            center: [55.7900842770336,49.11087849999998],
            zoom: 14,
            controls: ['zoomControl']
        }),

    // Вводим переменную
    myGeoObject = new ymaps.GeoObject;

    myMap.geoObjects
        .add(myGeoObject)
        .add(new ymaps.Placemark([55.78732577706483,49.1026589999999], {
            balloonContent: 'ул.Чернышевского, 43',
            iconCaption: 'Ильдан'
        }, {
            preset: 'islands#redDotIconWithCaption'
        }));

    myMap.behaviors
        // Отключаем часть включенных по умолчанию поведений:
        //  - drag - перемещение карты при нажатой левой кнопки мыши;
        //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
        .disable(['drag', 'rightMouseButtonMagnifier'])

    // Изменяем свойство поведения с помощью опции:
    // изменение масштаба колесом прокрутки будет происходить медленно,
    // на 1/2 уровня масштабирования в секунду.
    myMap.options.set('scrollZoomSpeed', 0.5);
}
/******* /ЯНДЕКС КАРТЫ API ********/

/******* ФИКСИРОВАННОЕ МЕНЮ ПРИ СКРОЛЛЕ ********/
$(document).ready(function(){

        var $menu = $("nav");

        $(window).scroll(function(){
            if ( $(this).scrollTop() > 779 && $menu.hasClass("nav") ){
                $menu.addClass("fixed");
            } else if($(this).scrollTop() <= 779 && $menu.hasClass("fixed")) {
                $menu.removeClass("fixed");
            }
        });//scroll
    });
/******* /ФИКСИРОВАННОЕ МЕНЮ ПРИ СКРОЛЛЕ ********/

/******* СКРИПТ ДЛЯ ПУНКТОВ МЕНЮ ********/
// Cache selectors
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});
/******* /СКРИПТ ДЛЯ ПУНКТОВ МЕНЮ *******/

/******* ПЛАВНЫЙ ПЕРЕХОД ПО ЯКОРЮ ********/
$(document).ready(function(){
    $(".nav,.burger-menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top - 0;
        
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 2500);
    });
	
	
	/*ПЕРЕХОД К ПОПАПУ В ЗАВИСИМОСТИ ОТ НАЛИЧИЯ ПАРАМЕТРА в адресной строке браузера*/
	var myParam = location.search.split('p=')[1];
	if(myParam)
	{
	console.log(myParam);
	
		if (myParam == 1)
		{
			var top = $("a[href='#form1']").offset().top - 0;
			$('body,html').animate({scrollTop: top}, 2500);
			setTimeout($("a[href='#form1']").click(), 3500);
			
		} else if (myParam == 2)
		
		{
			var top = $("a[href='#form4']").offset().top - 0;
			$('body,html').animate({scrollTop: top}, 2500);
			setTimeout($("a[href='#form4']").click(), 3500);
		} else if (myParam == 3)
		
		{
			var top = $("a[href='#form5']").offset().top - 0;
			$('body,html').animate({scrollTop: top}, 2500);
			setTimeout($("a[href='#form5']").click(), 3500);
		} else if (myParam == 4)
		
		{
			var top = $("a[href='#form6']").offset().top - 0;
			$('body,html').animate({scrollTop: top}, 2500);
			setTimeout($("a[href='#form6']").click(), 3500);
		} else if (myParam == 5)
		
		{
			var top = $("a[href='#form7']").offset().top - 0;
			$('body,html').animate({scrollTop: top}, 2500);
			setTimeout($("a[href='#form7']").click(), 3500);
		}
	}
		
});
/******* /ПЛАВНЫЙ ПЕРЕХОД ПО ЯКОРЮ ********/

/******* ОТПРАВКА ФОРМЫ НА ПОЧТУ ********/
$(document).ready(function() {

  //E-mail Ajax Send
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Спасибо! Ваша заявка принята, мы Вам позвоним.");
	  yaCounter38927060.reachGoal('formsend');
	 
	  
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

});
/******* /ОТПРАВКА ФОРМЫ НА ПОЧТУ ********/

/******* МАСКА ********/
jQuery(function($){
   $(".phone").mask("+7 (999) 999-99-99");
   });
/******* /МАСКА ********/

/******* NiceScroll ********/
$(document).ready(
          function() {
              $("html").niceScroll({
                cursorcolor:"#e4460f",
                cursoropacitymin: 1,
                cursorwidth: 10 
              });
          }
      );
/******* /NiceScroll ********/