;(function ($, win, doc) {
	'use strict';
	var $win = $(win), $doc = $(doc);
	$.preventActions = function (ev) {
		ev = ev || window.event;
		if (ev.stopPropagation && ev.preventDefault) {
			ev.stopPropagation();
			ev.preventDefault();
		}
		else {
			ev.cancelBubble = true;
			ev.returnValue = false;
		}
	}

	$.fn.tab = function (settings) {
		var options = $.extend(true, {
			triggers: 'a',
			triggerAttr: 'href',
			contents: '.tab-content',
			activeClassName: 'active',
			onChange: null
		}, settings || {});

		return this.each(function () {
			var $owner = $(this);

			var c = {
				init: function () {
					var triggers = options.triggers,
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

	$.fn.modal = function (settings) {
		var options = $.extend(true, {
			modal: '#modal',
			modalBody: '#modal_body',
			overlay: '#overlay',
			hasOverlay: true,
			contents: '#modal_contents',
			close: '#btn_close',
			template: ''
		}, settings || {});

		return this.each(function () {
			var $owner = $(this),
				$body = $('body')
			;

			var c = {
				$modal: $(options.modal),
				$modalBody: $(options.modalBody),
				$overlay: $(options.overlay),
				$close: $(options.close),
				$template: $(options.template).html(),
				init: function () {
					$owner.click( function (ev) {
						$.preventActions(ev);
						c.renderContent($(this).attr('id'));
						c.show();
					})
				},
				show: function () {
					var w = $win.width(),
						h = $win.height()
					;
					$body.css('overflow', 'hidden');
					c.$modal.show().css({width: w, height: h});
					if(options.hasOverlay) c.$overlay.show();

					this.$close.click(function () { c.hide(); });
					// this.$overlay.click(function () { c.hide(); })
				},
				renderContent: function (id) {
					var cur;
					$.each(data, function (i, n) { if (n.id === id){ cur = n; return false; } });
					this.$modalBody.html(Mustache.render(c.$template, cur));
				},
				hide: function () {
					$body.css('overflow', '');
					this.$modal.hide();
					if(options.hasOverlay) this.$overlay.hide();
				}
			}
			c.init();
		})
	}
})(jQuery, window, document);