import '../addons/Utils';
import HighLightNode from './HighlightNode';
import MarkingButtons from '../controller/MarkingButtons';

const c = {
	$target: '',
	init ($target) {
		this.$target = $target;
		$target.mousedown(function () {
			if (HighLightNode.items.length) {
				c.removeNonMarked();
				c.deactivateController();
			}
		})
			// .click(c.mark)
			.mouseup(c.mark)
	},
	mark (ev) {
		if(ev.target.getAttribute('class')==='correction-msg' || ev.target.getAttribute('class')==='comment-msg'){
			// $(ev.target).on('click', function () {
			// 	console.log('click = ',this)
			// });
			return false;
		};

		let $sp = HighLightNode.create(),
			sel = window.getSelection(),
			ori_range = '',
			sel_text = ''
		;
		if (sel) {
			if (sel.rangeCount) {
				ori_range = sel.getRangeAt(0);
				sel_text = sel.toString();
				let range = ori_range.cloneRange();
				try {
					let sc = range.startContainer.parentNode,
						ec= range.endContainer.parentNode
					;
					if(sel_text) {
						$sp = HighLightNode.parse(sc, ec, $sp);
					}
					else {
						range.surroundContents($sp.get(0));
					}
					sel.removeAllRanges();
					sel.addRange(range);

					HighLightNode.add({id: $sp.attr('id'), text: sel_text, el: $('#'+$sp.attr('id')), marked: false});
					sel.removeAllRanges();

					c.activateController(sel_text);
				}
				catch (e) {
					console.warn(e);
					if($sp) alert('Not Selectable');
					sel.removeAllRanges()
				}
			}
		}
	},
	destory() {
		this.$target.off('click');
	},
	removeNonMarked () {
		HighLightNode.removeNonMarked().forEach(function (n) {
			let $n = $('#' + n.id),
				text = '',
				$spans = $n.find('span, br')
			;
			if($spans.length) {
				$spans.each(function () {
					let $this = $(this);
					let t = '';
					if($this.is('br')) {
						t = '<br>';
					}
					else {
						t = $this.removeClass('f e').prop('outerHTML');
					}
					text += t
				});
			}
			// $n.after(text).remove();
			$n.replaceWith(text);
		})
	},
	activateController(selected_text) {
		let is_multi_mark = selected_text.length ? 1 : 0;
		MarkingButtons.activate(is_multi_mark);
	},
	deactivateController() {
		MarkingButtons.deactivate();
	}
};

module.exports = c;