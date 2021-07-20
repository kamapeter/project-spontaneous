var sld = $('.slide');
var i = location.hash;
var op = $(i).index();
var bar = $('#slides #myProgress #myBar');
var current = op == -1 ? 0 : op - 1;
var sldl = sld.length;
var inc = Math.round((100 / (sldl - 2)));
var pro = op == -1 ? 0 : Math.round((op - 1) *(100/(sldl - 2)));
bar.text(pro + '%');
bar.animate({
  width: pro + '%'
}, 800);
$('.slide').hide().eq(current).show();
var loc = window.location.href.split('#')[0];
window.scrollTo(0, 0);

function next() {
  sld.eq(current).fadeOut(10);
  current += current >= sldl - 1 ? 0 : 1;
  sld.eq(current).fadeIn(500);
  pro + inc > 100 ? pro = 100 : pro += inc;
  bar.animate({
    width: pro + '%'
  }, 800);
  bar.text(pro + '%');
  //var hsh = sld[current].getAttribute("id");
  //location.assign(loc + "#" + hsh);
  window.scrollTo(0, 0);
}
$('#slides').on('click', '.next', next);
$('#slides').on('click', '.previous', function(e) {
  sld.eq(current).fadeOut(10);
  current -= current <= 0 ? 0 : 1;
  sld.eq(current).fadeIn(500);
  pro -= inc;
  bar.animate({
    width: pro + '%'
  }, 800);
  bar.text(pro + '%');
  window.scrollTo(0, 0);
});
$('#slides').on('click', '.pass', function() {
 var get = $(this).parent().find('.crt:checked').length;
  if (get == 1) {
    next()
   } else {
    alert("make sure you check the right option");
  }
})
console.log(loc);
