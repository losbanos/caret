;(function ($, win, doc) {
	'use strict';
	$.fn.comment = function (settings) {
		let options = $.extend(true, {
			$removeBtn: '',
			$view: '',
			$ta: ''
		}, settings || {});

		return this.each(function () {
			let $owner = $(this),
				status = 'edit'
			;
			let c = {
				init() {
					$owner.on('click', function () {
						status = 'edit';
					})
						.on('focusout', function () {
							status = 'view';
						})
				},
				remove () {

				}
			}

			$owner.data('comment', c);
		})
	}
})(jQuery, window, document);