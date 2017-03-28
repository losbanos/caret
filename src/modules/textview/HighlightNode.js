import uuid from 'uuid';

const HighlightNode = {
	el: '',
	items: [],
	create () {
		let sp = document.createElement('span');
		sp.id = uuid.v1();
		sp.className = 'highlight';
		this.el = sp;
		return sp;
	},
	setAttributes(obj) {

	},
	add (el) {
		return this.items.push(el);
	},
	destory () {
		console.log('ab');
	}
};
module.exports = HighlightNode;