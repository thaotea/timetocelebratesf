$(document).ready(function () {
	if (isMobileOrTabletBrowser()) {
		$('body').addClass('mobile');
	}

	$('.letter-animation').each(function () {
		var characters = $(this).text().split('');
		$this = $(this);
		$this.empty();
		$.each(characters, function (i, el) {
			$this.append('<span>' + el + '</span>');
		});
	});

	mouseCursor();
});

function isMobileOrTabletBrowser() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(
		navigator.userAgent
	);
}

function mouseCursor() {
	var targetX = 0;
	var targetY = 0;
	var currentX = 0;
	var currentY = 0;
	var currentX2 = 0;
	var currentY2 = 0;
	var lastScrolledLeft = 0;
	var lastScrolledTop = 0;

	const animate = function () {
		currentX += targetX - currentX;
		currentY += targetY - currentY;

		currentX2 += (targetX - currentX2) * 0.25;
		currentY2 += (targetY - currentY2) * 0.25;

		$('.cursor span.sm').css('left', currentX - 25 + 'px');
		$('.cursor span.sm').css('top', currentY - 25 + 'px');

		$('.cursor span.lg').css('left', currentX2 - 25 + 'px');
		$('.cursor span.lg').css('top', currentY2 - 25 + 'px');

		requestAnimationFrame(animate);
	};

	animate();

	$(document).mousemove(function (event) {
		targetX = event.pageX;
		targetY = event.pageY;
		var cursor = $(event.target).css('--cursor');
		updateMouseCursor(cursor);
	});

	$(window).scroll(function (event) {
		if (lastScrolledLeft != $(document).scrollLeft()) {
			targetX -= lastScrolledLeft;
			lastScrolledLeft = $(document).scrollLeft();
			targetX += lastScrolledLeft;
		}
		if (lastScrolledTop != $(document).scrollTop()) {
			targetY -= lastScrolledTop;
			lastScrolledTop = $(document).scrollTop();
			targetY += lastScrolledTop;
		}
	});

	$('*[data-hover="hoverMultiply"]').each(function () {
		$(this)
			.mouseenter(function (event) {
				$('.cursor').addClass('multiply');
			})
			.mouseleave(function (event) {
				$('.cursor').removeClass('multiply');
			});
	});
}

function updateMouseCursor(cursor) {
	if (cursor == 'auto') {
		$('.cursor .sm svg').css('display', 'none');
		$('.cursor .sm #default').css('display', 'block');
	} else if (cursor == 'text') {
		$('.cursor .sm svg').css('display', 'none');
		$('.cursor .sm #text').css('display', 'block');
	} else if (cursor == 'plus') {
		$('.cursor .sm svg').css('display', 'none');
		$('.cursor .sm #plus').css('display', 'block');
	} else if (cursor == 'minus') {
		$('.cursor .sm svg').css('display', 'none');
		$('.cursor .sm #minus').css('display', 'block');
	} else if (cursor == 'pointer') {
		$('.cursor .sm svg').css('display', 'none');
		$('.cursor .sm #pointer').css('display', 'block');
	}
}
