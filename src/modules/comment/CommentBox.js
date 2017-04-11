import '../addons/Utils';
import EVENT from '../common/Events';

;(function ($) {
	'use strict';
	$.fn.comment = function (settings) {
		let options = $.extend(true, {
			$removeBtn: '',
			$view: '.view',
			$ta: 'textarea',
			activeClass: 'active',
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
					$owner.on('click', '.comment-head, .comment-text', function (ev) {
						$owner.addClass(options.activeClass);
						$ta.html($view.html().convertBRtoLineBreak());
						status = 'edit';
						$owner.trigger('edit', [$owner]);
					});
					$ta.on('focusout', function () {
						$owner.removeClass(options.activeClass);
						$view.html($ta.val().convertLineBreakToBR());
					});
					$ta.on('keydown', function (ev) {
						if(ev.which === 13 && ev.ctrlKey) {
							$owner.removeClass(options.activeClass);
							$view.html($ta.val().convertLineBreakToBR());
							if(!$view.text().length){ c.remove(); }
						}
						$owner.trigger('comment-added', )
					});

					$owner.on(EVENT.COMMENT_INPUT_TEXT, c.inputText);
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
				},
				inputText () {
					$view.html($ta.val().convertLineBreakToBR());
				}
			};
			c.init().show();

			$owner.data('comment', c);
		})
	}
})(jQuery);