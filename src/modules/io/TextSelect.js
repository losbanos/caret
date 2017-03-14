const c = {
	init ($target) {
		this.$ta = $target;
		$target.click(function () {
			let sp = document.createElement('span');
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
		this.$ta.off('click');
	}
};

module.exports = c;