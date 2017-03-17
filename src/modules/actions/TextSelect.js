import uuid from 'uuid';

const c = {
	$target: '',
	init ($target) {
		this.$target = $target;

		$target.click(function () {
			let sp = document.createElement('span');
			sp.id = uuid.v1();
			sp.className = 'highlight';

			let sel = window.getSelection();
			if(sel) {
				if(sel.rangeCount) {
					let range = sel.getRangeAt(0).cloneRange();
					range.surroundContents(sp);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		})
	},
	destory() {
		this.$target.off('click');
	}
};

module.exports = c;