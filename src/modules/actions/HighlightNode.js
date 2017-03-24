import uuid from 'uuid';

const HighlightNode = {
	el: '',
	create () {
		let sp = document.createElement('span');
		sp.id = uuid.v1();
		sp.className = 'highlight';
		this.el = sp;
		return sp;
	},
	setAttributes(obj) {

	},
	destory () {

	}
};
module.exports = HighlightNode;