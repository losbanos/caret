import '../addons/Utils';

;(function ($) {
	'use strict';
	$.fn.comment = function (settings) {
		let options = $.extend(true, {
			$removeBtn: '',
			$view: '.view',
			$ta: 'textarea',
			activeClass: 'edit',
			onRemove: null
		}, settings || {});

		return this.each(function () {
			let $owner = $(this),
				status = 'view',
				$view  = options.$view,
				$ta    = options.$ta
			;
			let c = {
				viewText: '',
				taText: '',
				init() {
					$owner.on('click', '.comment-text', function () {
						if(status==='view') {
							$owner.addClass(options.activeClass);
							$ta.html($view.html());
							// $ta.focus();
							status = 'edit';
						}
					});
					$ta.on('focusout', function () {
						// status = 'view';
						// $owner.removeClass(options.activeClass);
						// $view.html($ta.val().convertLineBreakToBR());
						// if(!$view.text().length){ c.remove(); }
					});
					$ta.on('keydown', function (ev) {
						if(ev.which === 13 && ev.ctrlKey) {
							status = 'view';
							$owner.removeClass(options.activeClass);
							$view.html($ta.val().convertLineBreakToBR());
							if(!$view.text().length){ c.remove(); }
						}
					})
					options.$removeBtn.one('click', this.remove);

					return c;
				},
				remove () {
					$owner.remove();
					if($.type(options.onRemove) === 'function') {
						let ids = $owner.attr('id').replace('comment_', '');
						options.onRemove.call($owner, ids);
					}
					return c;
				},
				show() {
					if($view.text().length) {
						$owner.removeClass(options.activeClass);
					}
					else {
						$owner.addClass(options.activeClass);
						// $ta.focus();
					}

					return c;
				}
			};
			c.init().show();

			$owner.data('comment', c);
		})
	}
})(jQuery);