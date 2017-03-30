;(function ($, win, doc) {
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
							// $owner.removeClass(options.activeClass);
							// $view.html($ta.hide().text());
							// status='view';
							$owner.addClass(options.activeClass);
							$ta.html($view.html());
							status = 'edit';
						}
					});
					$ta.on('focusout', function () {
						status = 'view';
						$owner.removeClass(options.activeClass);
						$view.html($ta.text());
					});
					options.$removeBtn.one('click', function () {
						if($.type(options.onRemove) === 'function') {
							let ids = $owner.attr('id').replace('comment_', '');
							$owner.remove();
							options.onRemove.call($owner, ids);
						}
					})

				},
				show() {
					if($view.text().length) {

					}
				},
				remove () {

				}
			};
			c.init();
			$owner.data('comment', c);
		})
	}
})(jQuery, window, document);