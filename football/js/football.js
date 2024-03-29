$(document).ready(function() {

	$( '.file' )
		.draggable({
			axis: 'xy',
			containment: '.desktop',
			opacity: 0.3,
		})
		.dblclick( function (ev) {
			$(this).hide().fadeIn();
			$( '.window' ).fadeIn();
			$( '.icon' ).show().css({'border-radius': '0px', 'background-color': 'transparent'});	
		});

	$( '.window' )
		.draggable({
			axis: 'xy',
			handle: '.panel',
			containment: '.desktop',
			opacity: 0.3,
		})
		.resizable({
			minHeight: 550,
			minWidth: 600,
			containment: '.desktop'
		});

	$( '.btns .btn' ).on('mousedown', function (ev) {
		ev.stopPropagation();
	});

	$('.btn-close' ).click( function (ev) {
		$( '.window' ).fadeOut();
		$( '.icon' ).hide();
	});

	$( '.btn-max' ).click( function (ev) {
		if(parseInt($( '.window' ).css( 'top' )) > 0 || parseInt($( '.window' ).css( 'left' )) > 0 ) {
			$('.window').css({'top': '0', 'left': '0', 'width': '100%', 'height': '100%'});
		} else {
			$('.window').css({'top': '3%', 'left': '10%', 'width': '600px', 'height': '550px'});
		}
	});

	$( '.btn-min' ).click( function (ev) {
		$( '.window' ).fadeOut();
		$( '.icon' ).css({'border-radius': '5px', 'background-color': 'aqua'});
	});

	$( '.icon' ).click( function (ev) {
		if ($( '.icon' ).css('border-radius') === '5px') {
			$( '.window' ).fadeIn();
			$(this).css({'border-radius': '0px', 'background-color': 'transparent'});
		} else {
			$( '.window' ).fadeOut();
			$(this).css({'border-radius': '5px', 'background-color': 'aqua'});
		}	
	});

	$( '.pusk' ).click( function (ev) {
		$(this).css({'border': '2px solid blue'});
		if($( '.menuPusk' ).css( 'display' ) === 'none') {
			$( '.menuPusk').show();
		} else {
			$( '.menuPusk' ).hide();
		};
		setTimeout(function(){
			$( '.pusk' ).css({'border': '0px solid blue'});	
		},100);
	});

	$( '.desktop' ).click( function () {
		$( '.menuPusk' ).hide();
	})

	$( '.hour' ).text(moment().format('HH:mm'));
	$( '.year' ).text(moment().format('DD.MM.YYYY'));

	// ИГРА 

	$('#start-btn').click( function (ev) {
		var padTop = $('.power-wrap').css('padding-top');

		setTimeout( function () {
			$('#start-btn').css({'background': 'aqua', 'box-shadow': '2px 2px 20px aqua' });

			setTimeout( function () {
				$('#start-btn').css({'background': 'none','-webkit-box-shadow': 'inset 0px 0px 10px #ccc','box-shadow': 'inset 0px 0px 10px #ccc' });
				},100);
		},50);

		if(parseInt($('.ball').css('top')) > 0) {
			$('.ball').css({'transition': 'all 0s linear 0s', 'left': '100px', 'top': '0'});
			$('.man').css({'display': 'none', 'left': '-160px', 'opacity': '0'});
			$('.power-wrap').addClass('animation');

			setTimeout( function () {
				$('#start-btn').text('KICK');
			},500);

			$('.goal').text('');
		} else {
			$('.ball').css({'transition': 'all 0.5s linear 0s', 'top': '95%'});
			$('.man').css({'display': 'block'});

			setTimeout( function () {
				$('.man').css({'transition': 'all 0.2s linear 0s', 'left': '0px', 'opacity': '1'});
			},1000);

			setTimeout( function () {
				$('.ball').css({'transition': 'all 0.5s linear 0s','left': 'calc(100% - ' + '90px - ' + (parseInt(padTop) * 3) + 'px )'});

				if (parseInt(padTop) >= 130) {
					$('.ball').css({'left': '20%'});
					$('.goal').text('МИМО !!!');
				};
				if (parseInt(padTop) <= 50) {
					$('.goal').text('ГООООЛ !!!');
					setTimeout( function () {
						$('.goal').css({'color':'green', 'text-shadow': '0px 0px 30px green' });
						setTimeout( function () {
							$('.goal').css({'text-shadow': 'none' });
						},500);
					},50);
				} else {
					$('.goal').text('МИМО !!!');
					setTimeout( function () {
						$('.goal').css({'color':'red', 'text-shadow': '0px 0px 30px red' });
						setTimeout( function () {
							$('.goal').css({'text-shadow': 'none' });
						},500);
					},50);
				};
				$('#start-btn').text('RESTART')
			},1200);

			$('.power-wrap').removeClass('animation');
			$('.power-wrap').css('padding-top', padTop);
		};
	});
})	