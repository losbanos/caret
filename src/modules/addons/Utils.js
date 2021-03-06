;(function ($, win, doc) {
	'use strict';

	String.prototype.convertLineBreakToBR = function () {
		if(!this.length) return false;
		return this.replace(/(\r\n|\r|\n)/g, '<br>');
	};
	String.prototype.parseToTag = function () {
		if(!this.length) return false;
		return this.replace(/<br\s?\/?>/ig,'\|').replace(/(.)/g, '<span>$1</span>').replace(/\<span\>\|\<\/span\>/g, '<br>');
	};
	String.prototype.convertBRtoLineBreak = function () {
		if(!this.length) return '';
		return this.replace(/\<br\s?\/?\>/g, '\r\n');
	};
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;

	let $win = $(win), $doc = $(doc);
	$.debounce = function (func, wait, immediate) {
		let timeout, args, context, timestamp, result;

		let later = function() {
			let last = $.now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			}
			else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				}
			}
		};

		return function () {
			context = this;
			args = arguments;
			timestamp = $.now();

			let callNow = immediate && !timeout;
			if (!timeout) timeout = setTimeout(later, wait);

			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	};

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
	};

	$.fn.modal = function (settings) {
		let options = $.extend(true, {
			modal: '#modal',
			modalBody: '#modal_body',
			overlay: '#overlay',
			hasOverlay: true,
			contents: '#modal_contents',
			close: '#btn_close',
			template: ''
		}, settings || {});

		return this.each(function () {
			let $owner = $(this),
				$body = $('body')
			;

			let c = {
				$modal: $(options.modal),
				$modalBody: $(options.modalBody),
				$overlay: $(options.overlay),
				$close: $(options.close),
				template: $(options.template).html(),
				init: function () {
					$owner.click( function (ev) {
						$.preventActions(ev);
						c.renderContent($(this).attr('id'));
						c.show();
					})
				},
				show: function () {
					let w = $win.width(),
						h = $win.height()
					;
					$body.css('overflow', 'hidden');
					c.$modal.show().css({width: w, height: h});
					if(options.hasOverlay) c.$overlay.show();

					this.$close.click(function () { c.hide(); });
					// this.$overlay.click(function () { c.hide(); })
				},
				renderContent: function (id) {
					let cur;
					$.each(data, function (i, n) { if (n.id === id){ cur = n; return false; } });
					this.$modalBody.html(Mustache.render(c.template, cur));
				},
				hide: function () {
					$body.css('overflow', '');
					this.$modal.hide();
					if(options.hasOverlay) this.$overlay.hide();
				}
			};
			c.init();
		})
	};
	$.fn.recoverText = function (settings) {
		let options = $.extend(true, {
			method: 'replaceWith' // or remove
		}, settings || {});

		return this.each(function () {
			let $owner = $(this);
				$owner.children('.f, .e').removeClass('f e');

			let text = $owner.html();

			if(options.method === 'replaceWith'){
				$owner[options.method](text);
			}
			else {
				$owner.after(text)[options.method]();
			}
		})
	};
	$.fn.removeMark = function () {
		return this.each(function () {
			let $this = $(this);
			$this.children('.f, .e').removeClass('f e');
			$this.replaceWith($this.html());
		})
	}
})(jQuery, window, document);