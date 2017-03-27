import Model from '../common/Model';
import HighLightNode from './HighlightNode';

const c = {
	$target: '',
	init ($target) {
		this.$target = $target;
		$target.click(function () {

			if(Model.items.length)  c.removeNonMarked();

			let sp = HighLightNode.create();
			let sel = window.getSelection(),
				ori_range = '',
				sel_text = ''
			;
			if(sel) {
				if(sel.rangeCount) {
					ori_range = sel.getRangeAt(0);
					sel_text = sel.toString();
					let range = ori_range.cloneRange();
					try {
						range.surroundContents(sp);
						sel.removeAllRanges();
						sel.addRange(range);
						Model.addItem({id: sp.id, text: sel_text, node: sp, marked: false});
						sel.removeAllRanges()
					}
					catch(e) {
						console.log(e);
						alert('선택 할수 없습니다');
						sel.removeAllRanges()
					}
				}
			}
		})
			.on('focusout', function () {
				console.log('ok out')
			})

	},
	destory() {
		this.$target.off('click');
	},
	removeNonMarked () {
		Model.getNonMarked().forEach(function (n) {
			if(!n.marked && !n.text.length) $('#'+n.id).remove();
		})
	}
};

module.exports = c;