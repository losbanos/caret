import HighLightNode from './HighlightNode';
import MarkingButtons from '../controller/MarkingButtons';

const c = {
	$target: '',
	init ($target) {
		this.$target = $target;
		$target.mousedown(function () {
			if (HighLightNode.items.length){
				c.removeNonMarked();
				c.deactivateController();
			}
		})
		.on('click', function () { c.mark(); })
	},
	mark () {
		let sp = HighLightNode.create(),
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
					range.surroundContents(sp);
					sel.removeAllRanges();
					sel.addRange(range);
					HighLightNode.add({id: sp.id, text: sel_text, el: sp, marked: false});
					sel.removeAllRanges();

					c.activateController(sel_text);
				}
				catch (e) {
					console.warn(e);
					alert('선택 할 수 없습니다');
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
			let $n = $('#'+n.id),
				text = $n.html()
			;
			// $n.after(text).remove();
			$n.replaceWith(text);
		})
	},
	activateController(selected_text) {
		let is_multi_mark = selected_text.length ? 1: 0;
		MarkingButtons.activate(is_multi_mark);
	},
	deactivateController() {
		MarkingButtons.deactivate();
	}
};

module.exports = c;