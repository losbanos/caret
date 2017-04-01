const SortText = {
	text: '',
	original: '',
	init(source) {
		this.text = this.original = source;
		this.text = this.text
			.replace(/(\r\n|\r|\n)/g, '\|')
			.replace(/\s{2,}/g, '')
			.replace(/(.)/g, '<span>$1</span>')
			.replace(/\<span\>\|\<\/span\>/g, '<br>');
		return this.text;
	},
	removeSpace(src) {
		let result = src? src: this.text;
		return result.replace(/(\s{2,}|$\s{2,})/, '');
	},
	convertLineBreakToBR(src) {
		let result = src? src: this.text;
		return result.replace(/(\r\n|\r|\n)/g, '<br>');
	},
	getText() {
		return this.text;
	}
};

export default SortText;