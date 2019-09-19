$(document).ready(function() {
		$("[data-fancybox]").fancybox({
   			loop: false,
   			keyboard: true,
   			arrows: true,
   			toolbar: true,
   			buttons: [
          		'slideShow',
          		'fullScreen',
          		'thumbs',
          		'share',
          		'download',
         	 	'zoom',
          		'close'
      		],
      		touch: {
          		vertical: true, 
          		momentum: true
      		},
   
  		});

		var $page = $('html, body');
		$('a[href*="#"]').click(function() {
    		$page.animate({
        		scrollTop: $($.attr(this, 'href')).offset().top
    		}, 400);
    		return false;
		});

		var btnIcon = document.querySelector('.icon'),
		    navMenu = document.querySelector('.nav-menu'),
		    listMenu = document.querySelectorAll('.list');
		function showMenu () {
			navMenu.classList.toggle('nav-menu-show');
		};
		function hideMenu () {
			navMenu.classList.remove('nav-menu-show');
		};

		btnIcon.addEventListener('click', showMenu );
		navMenu.addEventListener('mouseleave', hideMenu);
		for(let li of listMenu) {
			li.addEventListener('click',showMenu );
		};

	})
		