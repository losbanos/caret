String.prototype.convertLineBreakToBR = function () {
	if(!this.length) return '';
	return this.replace(/(\r\n|\r|\n)/g, '<br />');
}

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
							$owner.addClass(options.activeClass);
							$ta.html($view.html());
							status = 'edit';
						}
					});
					$ta.on('focusout', function () {
						status = 'view';
						$owner.removeClass(options.activeClass);
						$view.html($ta.val().convertLineBreakToBR());
						if(!$view.text().length){ c.remove(); }
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
					}

					return c;
				}
			};
			c.init().show();

			$owner.data('comment', c);
		})
	}
})(jQuery, window, document);