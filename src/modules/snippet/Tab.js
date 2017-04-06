;(function ($) {
	'use strict';

	$.fn.tab = function (settings) {
		let options = $.extend(true, {
			triggers: 'a',
			triggerAttr: 'href',
			contents: '.tab-content',
			activeClassName: 'active',
			onChange: null
		}, settings || {});

		return this.each(function () {
			let $owner = $(this);

			let c = {
				init: function () {
					let triggers = options.triggers,
						triggerType = $.type(triggers)
					;
					if(triggerType === 'array' && triggers.length) triggers = triggers.join(',');

					options.$triggers = $(triggers);
					$owner.on('click', triggers, function (ev) {
						$.preventActions(ev);
						c.show($(this));
					})
				},
				show: function ($t) {
					options.$triggers.removeClass(options.activeClassName);
					$t.addClass(options.activeClassName);

					$(options.contents).hide().removeClass(options.activeClassName);
					$($t.attr(options.triggerAttr)).show().addClass(options.activeClassName);

					if($.type(options.onChange) === 'function' && options.onChange) {
						options.onChange.call($owner, c);
					}
				},
				destory: function () {
					$owner.off('click').clearQueue().data('tab', null);
					c = null;
				}
			};

			c.init();
			$owner.data('tab', c);
		})
	};
})(jQuery, window, document);