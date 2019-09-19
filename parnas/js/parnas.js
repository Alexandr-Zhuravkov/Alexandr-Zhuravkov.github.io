document.addEventListener('DOMContentLoaded', function(){

	var button = document.querySelector('.button'),
		tur = 'Тур на гору \"Парнас\"',
		price = 1000,
		insurancePrice = 20,
		currency = 'ЕВРО',
		amount,
		priceAmount,
		insurancePriceAmount,
		windowBox = document.querySelector('.window'),
		massegeWindow = windowBox.querySelector('.massege-window'),
		name,
		inpText = windowBox.querySelector('#inp-text'),
		inputTour = windowBox.querySelector('#input-tour'),
		checkInsurance = windowBox.querySelector('#check-insurance'),
		insurance = windowBox.querySelector('#insurance'),
		ord = windowBox.querySelector('.order'),
		ok = windowBox.querySelector('.ok'),
		cansel = windowBox.querySelector('.cansel'),
		regCard = /\b[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\b/g,
		menuBtn = document.querySelector('.menuBtn'),
		itemMenu = document.querySelectorAll('.hide');

	menuBtn.addEventListener('click', function(ev) {
		ev.preventDefault();
		showMenu();
	} );
	function showMenu () {
		if (menuBtn.textContent === '▼ Меню ▼') {
			menuBtn.textContent = '▲ Меню ▲';
		} else {
			menuBtn.textContent = '▼ Меню ▼';
		};
		for (let item of itemMenu) {
			item.classList.toggle('show');
			item.classList.toggle('hide');
		}	
	};
	function submit () {
		var name = document.querySelector('#name'),
			surname = document.querySelector('#surname'),
			middlename = document.querySelector('#middlename');

		ord.style.display = 'none';
		ok.style.display = 'inline-block';

		if (!Number(name.value.trim()) && !Number(surname.value.trim()) && !Number(middlename.value.trim()) && name.value.trim() && surname.value.trim() && middlename.value.trim()) {
			var userName = 'Приветствуем вас, ' + name.value.trim().toUpperCase() + ' !';
			massegeWindow.textContent = userName + '  ' + 'Сейчас будет оформлен заказ на ' + tur + ' стоимостью ' + price + ' '  + currency + '. Укажите количество путевок, которое желаете купить!' + ' ( стоимость одной страховки ' +insurancePrice + ' ' + currency +' )';
			windowBox.style.display = 'block';
		} else {
			massegeWindow.textContent = 'Заполните все поля!';
			windowBox.style.display = 'block';
			checkInsurance.style.display = 'none';
			inputTour.style.display = 'none';
			
			ok.style.display = 'none';
			return;
		};
		ok.addEventListener('click', calc);


	};


	function calc () {
		ord.style.display = 'inline-block';
		ok.style.display = 'none';

		var tour = document.querySelector('#tour');
		
		amount = tour.value;
		priceAmount = price * Number(amount);
		insurancePriceAmount = insurancePrice * Number(amount);
		if (Number(amount.trim())) {
			if (insurance.checked) {
				massegeWindow.textContent = 'К оплате: ' + (priceAmount + insurancePriceAmount) + ' ' + currency + '!  Оформить заказ? ';
			} else {
				massegeWindow.textContent = 'К оплате: ' + priceAmount + ' ' + currency + '!  Оформить заказ? ';
			};
			checkInsurance.style.display = 'none';
			inpText.textContent = 'Введите номер банковской карты :';
			tour.value = '0000 0000 0000 0000';
			ord.addEventListener('click', order);
		} else {
			tour.value = 'Укажите кол-во';
			submit();
		};


	};

	function order () {
		var tour = document.querySelector('#tour');
		if (regCard.test(tour.value)) {
			inputTour.style.display = 'none';
			ok.style.display = 'none';
			ord.style.display = 'none';
			massegeWindow.textContent = 'Спасибо , ваш заказ был успешно оформлен! ' + 'Всего доброго , будем рады с вами сотрудичать! ';
			tour.value = '';
			tour.style.color = 'black';
		} else {
			tour.value = '0000 0000 0000 0000';
			tour.style.color = 'red';
		}
		

	};

	function remove (){
		document.querySelector('#name').value = '';
		document.querySelector('#surname').value = '';
		document.querySelector('#middlename').value = '';
		inputTour.style.display = 'block';
		ok.style.display = 'inline-block';
		tour.value = '';
		checkInsurance.style.display = 'block';
		inpText.textContent = 'Кол-во путевок : ';
		windowBox.style.display = 'none';
		

	};

	button.addEventListener('click', function(ev){
		ev.preventDefault();
		submit();	
	});
	cansel.addEventListener('click', remove);
})	
	
