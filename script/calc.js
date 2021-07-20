(function() {
  var a, b, c, keyB, g;
  var dt = document.inps;
  var $ = document.querySelector.bind(document);
  var $$ = document.querySelectorAll.bind(document);
  var User = {
    exec: function() {
      var prefs = JSON.parse(localStorage
        .getItem("userPref"));
      document.body.className = prefs.dark ?
        "dark" : "";
      if (prefs.useCust && prefs.keyType) {
        (function() {
          var params = Array.from($$(".params"));
          if (prefs.keyType == "fullKey") {
            var keys = [
              ["1", "2", "3", "-"],
              ["4", "5", "6", "+"],
              ["7", "8", "9", "←"],
              [".", "0", "^", "×10^"],
              ["✓", ">>"]
            ];
            params.forEach(function(param) {
              param.setAttribute("readonly", true)
            });
          } else if (prefs.keyType == "essKey") {
            keys = [
              ["^", "×10^", "✓", ">>"]
            ];
            params.forEach(function(param) {
              param.readonly = false;
            });
          }
          keyB = document.createElement("div");
          Object.assign(keyB, {
            className: "keyB",
            id: "keyB"
          });
          for (i = 0; i < keys.length; i++) {
            var row = document.createElement("div");
            Object.assign(row, {
              className: "rows row" + (i + 1)
            })
            for (j = 0; j < keys[i].length; j++) {
              var but = document.createElement("INPUT");
              Object.assign(but, {
                type: "button",
                value: keys[i][j],
                className: j % 4 == 3 ? "sp" : ""
              });
              row.appendChild(but);
            }
            keyB.appendChild(row);
          }
          document.body.appendChild(keyB);
          document.addEventListener("focusin", User.posKey, false);
          keyB.addEventListener("click", function(ev) {
            if (ev.target.type == "button") {
              var field = document.querySelector(".focused");
              var inpAr = Array.from($$('.params'));

              function off() {
                field.classList.remove("focused");
                field.blur();
                keyB.style.display = "none";
              }
              switch (ev.target.value) {
                case '←':
                  field.value = field.value.substr(0, field.value.length - 1);
                  break;
                case '>>':
                  var next = inpAr.indexOf(field) + 1;
                  inpAr[next] ?
                    inpAr[next].focus() :
                    off();
                  break;
                case '✓':
                  off();
                  break;
                default:
                  field.value += ev.target.value;
              }
            }
          }, false)
        }());
        if (prefs.keyType == "essKey") {
          keyB.addEventListener("click", function() {
            $(".focused").focus();
          }, false)
        }
      }
    },
    posKey: function(e) {
      if (e.target.type == "text") {
        e.preventDefault();
        if (document.querySelector(".focused")) {
          document.querySelector(".focused")
            .classList.remove("focused");
        }
        e.target.classList.add("focused");
        var focusedY =
          e.target.getBoundingClientRect().top + window.scrollY + 20;
        var windowH = document.documentElement.clientHeight;
        /*if(document.body.scrollHeight > windowH){
        		let scrollAmt = 0.6*windowH;
        		let ff = e.target.getBoundingClientRect().top ;
        		window.scrollBy(0,(scrollAmt-ff))
        		console.log(scrollAmt)
        }*/
        //console.log(window.height);
        keyB.style.display = "block";
        keyB.style.top = focusedY + 'px';
      }
    },
    Raw: localStorage.getItem("userPref") ?
      JSON.parse(localStorage.getItem("userPref")) : null
  }
  Number.prototype.approx = function() {
    var k;
    if(User.Raw) k = User.Raw.cons.deci || 2;
    else k = 2;
    var str = this.toString();
    var ei = str.indexOf("e");
    if (ei != -1) {
      var num = Number(str.substring(0, ei)).toFixed(k);
      var exp = str.substring(ei + 1, str.length);
      return `${num}×10^${exp}`;
    } else
      return this.toFixed(k);
  }
  var Calc = {
    but: document.getElementById("calc"),
    clear: document.querySelector("#clear"),
    expParse: function(exp) {
      var isSafe =/^\d+(\.\d)?(×?\d+\^?\+?-?\d+|×?\d+|\^?\+?-?\d+)?$/
      if (isSafe.test(exp)) return eval(exp.replace("×", "*").replace("^", "**"));
      else return null;
    },
    checkInps: function() {
      a = Calc.expParse(dt.par1.value) || null;
      b = Calc.expParse(dt.par2.value) || null;
      c = Calc.expParse(dt.par3.value) || null;
      d = dt.par4 ? Calc.expParse(dt.par4.value) : null;
      if(User.Raw)
      g = User.Raw.cons.g || 9.81;
      else g = 9.81;
      var params = document.querySelectorAll(".params");
      var unknownPar = [];
      var outp = document.querySelector("#out #add");
      for (var i = 0; i < params.length; i++) {
        if (params[i].value == '') {
          unknownPar.push(params[i])
        }
      }
      if (unknownPar.length != 1)
        outp.innerText = ' Make Sure You Leave One Field Empty';
      else {
        var sol = unknownPar[0].getAttribute('name');
        var solP = dt.getAttribute('data-way');
        outp.innerText = Calc.isValid(Calc.way[solP][sol]);
        outp.classList.add("anim");
      }
    },
    reset: () => {
      var params = document.querySelectorAll(".params");
      var outp = document.querySelector("#out #add");
      params.forEach(param => {
        param.value = ''
      })
      outp.textContent = "Output";
    },
    isValid: ans => {
      if (ans().indexOf("NaN") !== -1) {
        return "Invalid Inputs"
      } else {
        //var k = User.Raw.cons.deci || 3;
        return ans()
      }
    },
    way: {
      temp: function(name, num) {
        return `${dt[name].getAttribute("data-N")} = ${num.approx()} ${dt[name].getAttribute("placeholder")}`;
      },
      Force: {
        par3: () => `Force = ${(a*b).approx()} N`,
        par2: () => `Acceleration = ${(c/a).approx()} m/s²`,
        par1: () => `mass = ${(c/b).approx()} Kg`
      },
      angularA: {
        par3: () => `Angular Acceleration = ${(a/b).approx()} rad/s²`,
        par2: () => `Linear Acceleration = ${(b*c).approx()} m/s²"`,
        par1: () => `Radius = ${(a/c).approx()} m`
      },
      equ1: {
        par4: () => `Fin. Vel. = ${(a + b*c).approx()} m/s`,
        par3: () => `Time = ${((d-a)/b).approx()} s`,
        par2: () => `Accel. = ${((d-a)/c).approx()} m/s²`,
        par1: () => `Init. Vel. = ${(d-b*c).approx()} m/s`
      },
      equ2: {
        par4: () => `Fin. Vel = ${(Math.sqrt(a**2 + 2*b*c)).approx()} m/s`,
        par3: () => `Distance = ${((d**2-a**2)/(2*b)).approx()} m`,
        par2: () => `Accel. = ${((d**2-a**2)/(2*c)).approx()} m/s²`,
        par1: () => `Init. Vel. = ${(Math.sqrt(d**2-2*b*c))} m/s`
      },
      equ3: {
        par4: () => `Distance = ${((a*b)+(0.5*c*b**2)).approx()} m`,
        par3: () => `  = ${(((2*d)-(2*a*b))/(b**2)).approx()} m/s²`,
        par2: () => {
          var t = ((a * -1 + Math.sqrt((a ** 2) - (2 * c * d))) / c).approx();
          var rt = isNaN(t) || t < 0 ? (((-a + Math.sqrt((a ** 2) + 2 * c * d)) / c)).approx() : t;
          return `Time-Taken = ${rt} s`
        },
        par1: () => `Initial-Velocity = ${(((d)-(0.5*c*b**2))/(b)).toFixed()} m/s¹`
      },
      Gravity: {
        par4: () => `Force = ${((6.67e-11*a*b)/(c**2)).approx()} N`,
        par3: () => `Distance = ${(Math.sqrt(6.67e-11*a*b/d)).approx()} m`,
        par2: () => `Mass2 = ${((d*c**2)/(6.67e-11*a)).approx()} Kg`,
        par1: () => `Mass1 = ${((d*c**2)/(6.67e-11*b)).approx()} Kg`
      },
      KE: {
        par3: () => `K.E =  ${(0.5*a*b**2).approx()} J`,
        par2: () => `Vel. =  ${Math.sqrt(2*c/a).approx()} m/s`,
        par1: () => `Mass = ${(2*c/b**2).approx()} Kg`
      },
      FluidPress: {
        par3: () => `Press. = ${(a*g*b).approx()} N/m²`,
        par2: () => `Height = ${(c/(a*g)).approx()} m`,
        par1: () => `Dens. = ${(c/(b*g)).approx()} Kg/m³`
      },
      PE: {
        par3: () => `P.E = ${(a*g*b).approx()} J`,
        par2: () => `Height = ${(c/(a*g).approx())} m`,
        par1: () => `Mass = ${(c/(b*g)).approx()} Kg`
      },
      "a=b/c": {
        par3: () => Calc.way.temp("par3", a / b),
        par2: () => Calc.way.temp("par2", a / c),
        par1: () => Calc.way.temp("par1", b * c)
      },
      "c=a*b": {
        par3: () => Calc.way.temp("par3", a * b),
        par2: () => Calc.way.temp("par2", c / a),
        par1: () => Calc.way.temp("par1", c / b)
      }
    }
  }
  //window.addEventListener("load", User.exec,false);
  if (User.Raw) {
    User.exec();
  }
  Calc.but.addEventListener("click",
    Calc.checkInps, false);
  Calc.clear.addEventListener("click", Calc.reset, false);
}());
