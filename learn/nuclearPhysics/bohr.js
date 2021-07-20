var elect = $('.electronO');
var exp = $('#key');
var jump = setInterval(function () {
				if(elect.css('top')=='-110px') {
								elect.animate({top: '-10px'},200).delay(-100).css('backgroundColor','black');
								exp.html('Electron emmits energy.<br>Electron is in ground state.<br>E<sub>e</sub>=E<sub>3</sub> - hf')
				}else {
								elect.animate({top: '-110px'},200).delay(-100).css('backgroundColor','yellow');
								exp.html('Electron absorbs energy.<br>Electron is excited.<br>E<sub>e</sub>=E<sub>1</sub> + hf');
				}
				},4000);
