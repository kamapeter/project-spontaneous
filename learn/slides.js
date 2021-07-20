var sld = $('.slide');
var hashDir = location.hash;
var hashIndex = $(hashDir).index();
var bar = $('#slides #myProgress #myBar');
var current = hashIndex == -1 ? 0 : hashIndex - 1;
var sldl = sld.length;
var incr = 100 / (sldl - 1);
var loc = window.location.href.split('#')[0];
var pro = hashIndex == -1 ? 0 : (hashIndex ) * Math.round(incr);
bar.text(pro + '%');
bar.animate({
  width: pro + '%'
}, 800);
$(".slide").addClass("hide")
.eq(current).addClass("show");
window.scrollTo(0,0);
function next() {
		sld.eq(current).addClass("slideOutFromRight")
		.bind("webkitAnimationEnd",function () {
				sld.eq(current-1).removeClass("show");
				sld.eq(current).css({top: '0px'})
				.removeClass("slideInFromRight")
		});		
		current += current >= sldl - 1 ? 0 : 1;
		sld.eq(current).css({
				top: - sld.eq(current - 1).height() + 'px',
				//left: "100%"
		})
		.removeClass("slideOutFromLeft")
		.addClass("show slideInFromRight")
		.bind("webkitAnimationEnd",function () {
				$(".slideInFromRight")
				  .removeClass("slideInFromRight")
				  .unbind("webkitAnimationEnd")
		})
		pro += incr;
		bar.text(Math.round(pro) + '%');
   bar.animate({
     width: Math.round(pro) + '%'
   }, 800);
		window.scrollTo(0,0)
}
function previous() {
		sld.eq(current)
		.addClass("slideOutFromLeft")
		.css({top: - sld.eq(current - 1).height() + 'px'})
		.bind("webkitAnimationEnd", function () {
				sld.eq(current+1).removeClass("show slideOutFromLeft")
				.unbind("webkitAnimationEnd");
		});	
		current -= current <= 0 ? 0 : 1;
		sld.eq(current)//.css({top: 0})
		.removeClass("slideOutFromRight")
		.addClass("show slideInFromLeft")
		.bind("webkitAnimationEnd",function () {
				$(".slideInFromLeft")
				  .removeClass("slideInFromLeft")
				  .unbind("webkitAnimationEnd")
		});
		pro -= incr;
		bar.text(Math.round(pro) + '%');
   bar.animate({
     width: Math.round(pro) + '%'
   }, 800);
		window.scrollTo(0,0)
}

$("#slides").on("click", '.next', next);
$('#slides').on('click', '.previous', previous);
$('#slides').on('click', '.pass', function() {
 var get = $(this).parent().find('.crt:checked').length;
  if (get == 1) {
    next()
   } else {
    alert("make sure you check the right option");
  }
})