$(function() {
	// инициализация переменных

	var boxNumbers = $( '#box-numbers' ).children(),//основной контейнер с числами
		boxBeforSort = $( '#befor-numbers' ).children(),//контейнер с числами перед сортировкой
		boxAfterSort = $('#after-numbers').children(), //контейнер с числами после сортировки
		numsArray = [], //массив для записи сгенерировынных чисел
		randomMax = 99, //верхнее значение диапазона случайных чисел
		randomMin = -99,//нижнее значение диапазона случайных чисел
		timerID, // идентификатор функции отложенного вызова
		timeout = [], // массив для записи идентификаторов таймера 
		animatTime = 400, // скорость анимации в млсек.
		comparison = false, //для передачи рез сравнений в функцию 
		displayOn = false,// для определения наличия интерфейса
		instruction1 = '1 - Нажмите на кнопку "Генерация чисел" - для начала генерации случайных чисел !',
		instruction2 = '2 - Нажмите на кнопку "Сортировка чисел" - для начала сортировки сгенерированных чисел !',
		intervalID, //для анимированного заполнения поля инсрукции
		ind = 0; // для определения индекса символа в инструкции

	// функция очистки интерфейса, перед началом работы
	function cleanInterface () {
		$('.btn').hide();//скрыть кнопки
		$('#box-numbers').hide();//скрыть контейнеры для чисел
		$('.befor-sort').hide();
		$('.after-sort').hide();
		$('.process-sort').hide();//скрыть индикатор процесса
		$('.process-value').removeAttr('style');//сброс значения индикатора 
		$('.cursor').hide();//скрыть курсор
		$('.paragraph-1').html('');//очистить содержимое инструкций
		$('.paragraph-2').html($('.cursor')[0]);
		$('#sort').attr('disabled', '');//заблокировать кнопку сортировки
		stopAnimation ();// сброс анимации сортировки
	};
	cleanInterface();

	//вкл-выкл монитор
	$('.on-off').on('click', function(){

		if (displayOn) { //если монитор вкл

			cleanInterface(); //очистка интерфейса
			clearInterval(intervalID); //очистка интервала заполнения инструкции
			displayOn = false;
			ind = 0; //сброс значения индекса символа в инструкции

		} else { //если монитор выкл

			displayOn = true;
			//анимированный процесс заполнения полей для инструкций
			intervalID = setInterval( function(){//заполнение 1 пункт
				$('.paragraph-1').append(instruction1[ind]);
				ind ++;
				if ( ind == instruction1.length) {
					clearInterval(intervalID);
					ind = 0;
					intervalID = setInterval(function() { //заполнение 2 пункт
						$('.cursor').show();
						$('.cursor').before(instruction2[ind]);
						ind ++;
						if ( ind == instruction2.length + 1) {
							clearInterval(intervalID);
							$('.btn').fadeIn();
							$('#box-numbers').fadeIn();
							
							intervalID = setInterval(function(){// мигание курсора
								$('.cursor').fadeOut(animatTime).fadeIn(animatTime);
							}, 2 * animatTime)
						}
					}, 0.06 * animatTime)
				}
			}, 0.06 * animatTime);
		}
		
	});

	// запуск генерации случайных чисел
	$('#generation').on('click', function(){

		$('.process-value').removeAttr('style');//сброс значения индикатора сортировки

		stopAnimation ();// сброс анимации сортировки

		generation ();// заполнение контейнеров случайными числами

		$('#sort').removeAttr('disabled');//сброс блокировки кнопки сортировка

		$('.befor-sort').fadeIn();// отображение контейнеров "до-после сортировки"
		$('.after-sort').fadeIn();

	});

	// запуск сортировки чисел
	$('#sort').on('click', function(){

		$('#sort').attr('disabled', '');//блокировка кнопки сортировка

		sort(); //сортировка чисел

		$('.process-sort').fadeIn(2 * animatTime); // отображение индикатора сортировки
	});

	// генерация и заполнение контейнеров случайными числами
	function generation () {
		for ( var i = 0; i < boxNumbers.length; i++) {

			var randomNum = Math.round( Math.random() * ( randomMax - randomMin ) + randomMin );

			numsArray[i] = randomNum;// заполнение массива для внутренней работы 

			$( boxNumbers[i] ).text( randomNum );// заполнение елементов основного контейнера числами 
			$( boxBeforSort[i] ).text( randomNum );// заполнение елементов контейнера с числами перед сортировкой
			
			$( boxAfterSort[i] ).text('').removeAttr('style');//очистка и сброс стилей елементов контейнера с числами после сортировки
		}

	};

	//сортировка чисел пузырьком - сравнивает каждое число массива с соседним i раз.  
	function sort () {
		for ( var i = 0, time = 0; i < numsArray.length; i++) {//time - для передачи задержки в функцию анимированной сортировки 

			var sortControl = 0;//для контроля преждевременного завершения сортировки

			for (var j = 1; j < numsArray.length; j++) { // сравнивает каждый эл-т массива с предыдущим
				
				if( numsArray[j] < numsArray[j-1] ){ //если текущ. эл-т больше предыдущеого

					comparison = true; // записывает в условие сравнение(истина)

					timerID = sortAnimation(i, j, time, comparison);// запускает функцию анимированной сортировки(передает номер текущей итерации, индекс елемента, время отложенного вызова, условие сравнение) и записывает вернувшыйися идентификатор таймера
					timeout.push(timerID);// записывает текущий идентификатор таймера в массив, для возможности дальнейшего сброса
					time += animatTime * 2;//увеличивает время следующего отложенного вызова

					var change_elem = numsArray[j];// меняет местами элементы массива
					numsArray[j] = numsArray[j-1];
					numsArray[j-1] = change_elem;

				} else { //если текущ. эл-т не больше предыдущеого
					comparison = false;// записывает в условие сравнение(ложь)

					timerID = sortAnimation(i, j, time, comparison);// запускает функцию анимированной сортировки(передает номер текущей итерации, индекс елемента, время отложенного вызова, условие сравнение) и записывает вернувшыйися идентификатор таймера

					timeout.push(timerID);
					time += animatTime;

					sortControl += 1;//увеличиваем каждый раз значение контроллера завершения сортировки
				}
				
			};

			if ( sortControl == numsArray.length - 1) {//если в текущ итарации условие неравенства не разу не сработало выходим из цикла
				i = numsArray.length; // задаем значение 
				timerID = endAnimation ( i, time );// запускает функцию завершение анимированной сортировки (передает номер текущей итерации, время отложенного вызова) и записывает вернувшыйися идентификатор таймера
				timeout.push(timerID);
				
			}
		};
	};

	//функция анимированной сортировки возвращает идентификатор таймера
	function sortAnimation (iter, index, t, comparison ) {
		return setTimeout( function () {

			$('.process-value').css({'width' : (iter / numsArray.length)  * 100 + '%'});//увеличивает значение индикарора сортировки в зависимости от текущ. итерации
			
			//записывает в память текущ. элементы сравнения
			var elem1 = boxNumbers[index - 1];
			var elem2 = boxNumbers[index];

			if( comparison ) { //если условие сравнения сработало

				//записывает в память содержимое текущ. элементов сравнения
				var valEl1 = $(elem1).text();
				var valEl2 = $(elem2).text();

				//анимация процесса обмена значениями 
				$(elem1).css({'background-color' : '#00FF12', 'color': 'black'}).fadeOut( animatTime).fadeIn(0.5 * animatTime);
				$(elem2).css({'background-color' : '#00FF12', 'color': 'black'}).fadeOut( animatTime).fadeIn(0.5 * animatTime);

				setTimeout (function() {
					$(elem1).text(valEl2);
					$(elem2).text(valEl1);
				}, animatTime);

				setTimeout (function() {
					$(elem1).removeAttr('style');
					$(elem2).removeAttr('style');
				}, 1.5 * animatTime);

			} else { //если условие сравнения не сработало

				//анимирует процесс обхода элементов массива
				$(elem1).css({'border' : '2px solid #00FF12'});
				$(elem2).css({'border' : '2px solid #00FF12'});

				setTimeout (function() {
					$(elem1).removeAttr('style');
					$(elem2).removeAttr('style');
				}, 0.5 * animatTime);

			}

		}, t);// запускается отложенно в зависимости от переданного значения

	};

	// завершение сортировки
	function endAnimation ( iter, t ) {
		return setTimeout(function() {

			//задает сто процентное значение индикатору сортировки и скрывает его
			$('.process-value').css({'width' : (iter / numsArray.length)  * 100 + '%'});
			$('.process-sort').fadeOut(3 * animatTime);
			setTimeout(function(){
				$('.process-value').removeAttr('style');
			}, 4 * animatTime);

			//записывает значения отсортированных чисел в контейнер "числа после сортировки" и отображает их
			numsArray.forEach(function (el,i,array) {

				$(boxAfterSort[i]).text(el).css({'margin':'5px 0 0 5px'});

			});
			
		}, t)
	};

	function stopAnimation () {
		for (var timeID of timeout) {
			clearTimeout(timeID);
		};// сброс анимации сортировки
	};
})