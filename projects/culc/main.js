/*//Калькулятор с использованием fanction eval //--Start--
try{
	function Calc (val1, val2){
	this.val1 = val1;
	this.val2 = val2;
	alert(this.val1 + this.val2);
}
eval('var arr = [+prompt("val1"), +prompt("val2")]');//here error
//console.log(arr);
var calc = new Calc(arr[0], arr[1]);
}
catch(e){
	if(e.name == "ReferenceError"){
		alert(e.name + ": в коде ошибка!" );
	}
	else{ 
		throw e;
	}
	
}
finally{
	if(typeof arr[0] !== 'number' || typeof arr[1] == 'number'){
		alert('одно из значений не является числом!');
		eval('var arr = [+prompt("val1"), +prompt("val2")]');//here error
		//console.log(arr);
		calc.val1 = arr[0];
		calc.val2 = arr[1];
		Calc(calc.val1, calc.val2);
	}
}


function Animal(name) {
  this.name = name;
  this.speed = 0;
}

Animal.prototype.run = function(speed) {
  this.speed += speed;
  alert( this.name + ' бежит, скорость ' + this.speed );
};

Animal.prototype.stop = function() {
  this.speed = 0;
  alert( this.name + ' стоит' );
};
//******************************************
function Rabbit(name) {
  this.name = name;
  this.speed = 0;
}

Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.jump = function() {
  this.speed++;
  alert( this.name + ' прыгает' );
};

Rabbit.prototype.run = function (){
	Animal.prototype.run.apply(this, arguments);
	this.jump();
};
var rabbit = new Rabbit('Кроль');

rabbit.run(12);
*/

// Time (now)
var output_timer = document.getElementsByClassName('time')[0];
var ms_timer = document.getElementsByClassName('ms')[0];
var output_hours = document.getElementsByClassName('hours')[0];
let date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var ms = 0;
function Clock(cond){
	if(cond){
		if(ms == 0){
			setInterval(function(){
				ms++;
				ms_timer.innerHTML = ":"+ms;
				if(ms == 100){
					ms = 0;
				}
			},10);
		}
		setInterval(function(){

			seconds++;
			if(seconds == 60){
				minutes++;
				seconds = 0;
			} 
			if(minutes == 60){
				hours++;
				minutes = 0;
			} 
			if(seconds <= 10) output_timer.innerHTML = hours + ':' + minutes + ':0' + seconds	;
			if(minutes <= 10){
				output_timer.innerHTML = hours + ':' + minutes + ':0' + seconds	;
			} 
			if(hours <= 10) output_timer.innerHTML = hours + ':' + minutes + ':0' + seconds	;
			else{
				output_hours.innerHTML = hours;
				output_timer.innerHTML = output_hours.innerHTML + ':' + minutes + ':' + seconds	;
			} 

		}, 1000);
	}
}
Clock(false);
//Finish


var ran1, ran2, ran3;
ran1 = Math.floor(Math.random() * 100);
ran2 = Math.floor(Math.random() * 100);
ran3 = Math.floor(Math.random() * 100);


output_hours.style.background = '#'+ran1+ran2+ran3;

//console.log(output_hours);

///************************************************///
///Calculator///***********************************///
//Объявления переменных
var b1 = document.getElementsByClassName('b1')[0],
b2 = document.getElementsByClassName('b2')[0],
b3 = document.getElementsByClassName('b3')[0],
b4 = document.getElementsByClassName('b4')[0],
b5 = document.getElementsByClassName('b5')[0],
b6 = document.getElementsByClassName('b6')[0],
b7 = document.getElementsByClassName('b7')[0],
b8 = document.getElementsByClassName('b8')[0],
b9 = document.getElementsByClassName('b9')[0],
b10 = document.getElementsByClassName('b0')[0],
out_input = document.getElementsByClassName('input-output_calc')[0],
plus = document.getElementsByClassName('plus')[0],
clear = document.getElementsByClassName('clear')[0],
deleted = document.getElementsByClassName('delete')[0],
minus = document.getElementsByClassName('minus')[0],
del = document.getElementsByClassName('del')[0],
mp = document.getElementsByClassName('mp')[0],
point = document.getElementsByClassName('point')[0],
sqrt = document.getElementsByClassName('sqrt')[0],
tempDiv = document.getElementsByClassName('temp')[0],
equally = document.getElementsByClassName('equally')[0];


 //out_input.value = 12;
 function ClickButtonsN(obj, val){
 	obj.addEventListener('click', function(){
 		if(out_input.value == '0'){
 			out_input.value = val;
 		}
 		else{
 			out_input.value += val;
 		}

 	}, false);
 }
 ClickButtonsN(b1, 1);
 ClickButtonsN(b2, 2);
 ClickButtonsN(b3, 3);
 ClickButtonsN(b4, 4);
 ClickButtonsN(b5, 5);
 ClickButtonsN(b6, 6);
 ClickButtonsN(b7, 7);
 ClickButtonsN(b8, 8);
 ClickButtonsN(b9, 9);
 ClickButtonsN(b10, 0);

 
 deleted.addEventListener('click', function(){
 	if(out_input.value.length == 1){
 		out_input.value = 0;
 	}
 	else{
 		out_input.value = out_input.value.substr(0, out_input.value.length - 1);
 	}
 }, false);



 
 clear.addEventListener('click', function(){
 	out_input.value = 0;
 	tempDiv.innerHTML = "";
 }, false);

 sqrt.addEventListener('click', function(){
 	out_input.value = Math.sqrt(out_input.value);
 }, false);

 point.addEventListener('click', function(){
 	out_input.value = out_input.value + '.';
 }, false);
 
 
 var 	no_module = document.getElementsByClassName('no_module')[0],
 module_calc = document.getElementsByClassName('module_calc')[0],
 Calc_HTML = document.getElementsByClassName('Calc')[0],
 sqrt2 = document.getElementsByClassName('sqrt2')[0],
 pi = document.getElementsByClassName('pi')[0],
 ceil_func = document.getElementsByClassName('ceil_func')[0],
 floor_func = document.getElementsByClassName('floor_func')[0],
 round_func = document.getElementsByClassName('round_func')[0],
 brecket_left = document.getElementsByClassName('brecket_left')[0],
 brecket_right = document.getElementsByClassName('brecket_right')[0],
 active_module = document.getElementsByClassName('active_module')[0];

 active_module.addEventListener('change', function(){
 	Calc_HTML.style.width = "775px";
 	out_input.style.width = "707px";
 	setTimeout(function(){
 		module_calc.style.display = "block";
 	}, 500);
 }, false);


 no_module.addEventListener('change', function(){
 	Calc_HTML.style.width = "400px";
 	out_input.style.width = "335px";
 	module_calc.style.display = "none";
 }, false);

//Math.round(x)
function constFunc(obj, f = function(){}){
	obj.addEventListener('click', function(){
		f();
	}, false);
}

constFunc(sqrt2, function(){
	out_input.value = out_input.value * out_input.value;
});
constFunc(pi, function(){
	out_input.value = Math.PI;
});
constFunc(ceil_func, function(){
	out_input.value = Math.ceil(out_input.value);
});
constFunc(floor_func, function(){
	out_input.value = Math.floor(out_input.value);
});
constFunc(round_func, function(){
	out_input.value = Math.round(out_input.value);
});
constFunc(brecket_left, function(){
	if(out_input.value == "0"){
		out_input.value = '(';
	}
	else{
		out_input.value += '(';
	}
});
constFunc(brecket_right, function(){
	if(out_input.value == "0"){
		out_input.value = ')';
	}
	else{
		out_input.value += ')';
	}
});

function Operation(obj, oper){
	obj.addEventListener('click', function(){
 		//tempDiv.innerHTML = out_input.value + " " + oper+" ";
 		out_input.value += " " + oper +" ";
 		Oper(out_input.value, oper);
 	}, false);
}

Operation(plus, "+");
Operation(minus, "-");
Operation(mp, "*");
Operation(del, "/");
 //plus.addEventListener('click', function(){
 //	tempDiv.innerHTML = out_input.value + " + ";
 //	out_input.value = 0;
 //	Oper("+");
 //}, false);
 function CheckDel(val){
 	if(val.split(' = ')[0].split(' / ')[0] == 0){
 		tempDiv.innerHTML = new Error('на ноль делить нельзя!');
 	}
 }
 function Oper(val1, o){
 	//console.log(o);
 }
 equally.addEventListener('click', function(){
 	if(out_input.value.split(' ').length == 3){
 		switch(out_input.value.split(' ')[1]){
 			case '+':
 			out_input.value = +out_input.value.split(' ')[0] + (+out_input.value.split(' ')[2]);
 			break;
 			case "-":
 			out_input.value = +out_input.value.split(' ')[0] - (+out_input.value.split(' ')[2]);
 			break;
 			case "*":
 			out_input.value = +out_input.value.split(' ')[0] * (+out_input.value.split(' ')[2]);
 			break;
 			case "/":
 			out_input.value = +out_input.value.split(' ')[0] / (+out_input.value.split(' ')[2]);
 			break;
 			default:
 			alert(NaN);
 		}
 	} 
 	else{
 			//val1 - значение в скобках
 			// val2 - значение вне скобках
 			//o1 - знак вне скобок
 			//o2 - знак в скобках
 			var val1, val2, o1, o2;
 			o2 = out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[1];
 			val2 = out_input.value.split('(')[0].substr(0, out_input.value.split('(')[0].length - 1).split(' ')[0];
 			o1 = out_input.value.split('(')[0].substr(0, out_input.value.split('(')[0].length - 1).split(' ')[1];
 			switch(o2){
 				case "+":
 				val1 = +out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[0] + (+out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[2]);
 				break;
 				case "-":
 				val1 = +out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[0] - (+out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[2]);
 				break;
 				case "*":
 				val1 = +out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[0] * (+out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[2]);
 				break;
 				case "/":
 				val1 = +out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[0] / (+out_input.value.split('(')[1].substr(0, out_input.value.split('(')[1].length - 1).split(' ')[2]);
 				break;
 			}
 			switch(o1){
 				case "*":
 				out_input.value = val1 * val2;
 				break;
 				case "+":
 				out_input.value = val1 + val2;
 				break;
 				case "/":
 				out_input.value = val1 / val2;
 				break;
 				case "-":
 				out_input.value = val1 - val2;
 				break;
 			}
 			console.log(val2);
 		}
 		console.log(out_input.value);
 		//switch(o){
 		//	case "+":
 		//	tempDiv.innerHTML += out_input.value + " = ";
 		//	tempDiv.innerHTML += +tempDiv.innerHTML.split(' = ')[0].split(' + ')[0] + (+tempDiv.innerHTML.split(' = ')[0].split(' + ')[1]);
 		//	out_input.value = +tempDiv.innerHTML.split(' = ')[0].split(' + ')[0] + (+tempDiv.innerHTML.split(' = ')[0].split(' + ')[1]);
 		//	break;
 		//	case"-":
 		//	tempDiv.innerHTML += out_input.value + " = ";
 		//	tempDiv.innerHTML += +tempDiv.innerHTML.split(' = ')[0].split(' - ')[0] - (+tempDiv.innerHTML.split(' = ')[0].split(' - ')[1]);
 		//	out_input.value = +tempDiv.innerHTML.split(' = ')[0].split(' - ')[0] - (+tempDiv.innerHTML.split(' = ')[0].split(' - ')[1]);
 		//	break;
 		//	case"*":
 		//	tempDiv.innerHTML += out_input.value + " = ";
 		//	tempDiv.innerHTML += +tempDiv.innerHTML.split(' = ')[0].split(' * ')[0] * (+tempDiv.innerHTML.split(' = ')[0].split(' * ')[1]);
 		//	out_input.value = +tempDiv.innerHTML.split(' = ')[0].split(' * ')[0] * (+tempDiv.innerHTML.split(' = ')[0].split(' * ')[1]);
 		//	break;
 		//	case "/":
 		//	tempDiv.innerHTML += out_input.value + " = ";
 		//	CheckDel(tempDiv.innerHTML);
 		//	tempDiv.innerHTML += +tempDiv.innerHTML.split(' = ')[0].split(' / ')[0] / (+tempDiv.innerHTML.split(' = ')[0].split(' / ')[1]);
 		//	out_input.value = +tempDiv.innerHTML.split(' = ')[0].split(' / ')[0] / (+tempDiv.innerHTML.split(' = ')[0].split(' / ')[1]);
 		//	break;



 		//}
 	}, false);
