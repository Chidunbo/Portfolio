/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Portfolio section tabs under About Me.
		var tabAliases = {
			'learning-experience': 'featured-work',
			'ux-design': 'featured-work',
			'software-prototypes': 'software-projects',
			'physical-computing': 'hardware-projects'
		};

		function activateTab(id) {
			id = tabAliases[id] || id;
			var $tab = $('.section-tab[data-tab="' + id + '"]');

			if (!$tab.length) {
				return false;
			}

			$('.section-tab').removeClass('is-active').attr('aria-selected', 'false');
			$('.tab-panel').removeClass('is-active');
			$tab.addClass('is-active').attr('aria-selected', 'true');
			$('#' + id).addClass('is-active');
			return true;
		}

		$('.section-tab').on('click', function() {
			var id = $(this).attr('data-tab');

			if (activateTab(id) && history.replaceState) {
				history.replaceState(null, '', '#' + id);
			}
		});

		var initialHash = window.location.hash.replace('#', '');

		if (initialHash) {
			if (!activateTab(initialHash)) {
				var $parentPanel = $('#' + initialHash).closest('.tab-panel');

				if ($parentPanel.length) {
					activateTab($parentPanel.attr('id'));
				}
			}
		}

	// Main Sections: Two.

		// Open the same destination as the project title, not a lightbox.
			$window.on('load', function() {

				$('.work-item').each(function() {
					var $titleLink = $(this).find('h3 a').first();
					var $imageLink = $(this).find('a.image').first();

					if ($titleLink.length && $imageLink.length) {
						$imageLink.attr('href', $titleLink.attr('href'));
					}

					$(this).find('a.image, .project-action').attr({
						target: '_blank',
						rel: 'noopener noreferrer'
					});
				});

			});

})(jQuery);