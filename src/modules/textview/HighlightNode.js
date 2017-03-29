import uuid from 'uuid';
import _ from 'lodash';

const h = {
	el: '',
	items: [],
	create () {
		let sp = document.createElement('span'),
			ico = document.createElement('i')
		;
		sp.id = uuid.v1();
		sp.className = 'highlight';
		this.el = sp;

		// $(sp).on('click', this.clicked);
		return sp;
	},

	add ($el) {
		console.log('node el = ', this.items.length);
		return this.items.push($el);
	},
	clicked() {
		console.log('clicked by create Element')
	},
	getCurrentItem() {
		return this.items[this.items.length -1 ];
	},
	getNonMarked () {
		return this.items.filter(function (n) {
			return n.marked === false;
		})
	},
	removeItem (idx) {
		return this.items.splice(idx, 1);
	},
	removeNonMarked() {
		let removed = _.remove(this.items, function (n) {
			return n.marked === false;
		});
		console.log('removed = ',removed)
		return removed;
	},
	setAttributes(obj) {

	},
	setType (type) {

	},
	setCurrentItemToMarked() {
		this.getCurrentItem().marked = true;
	},
	setItemToMarked(cur) {
		let item = _.find(this.items, {id: cur.id});
		item.marked = true;
	}
};
function MarkNode() {
	let sp = document.createElement('span'),
		ico = document.createElement('i')
	;

	sp.id = uuid.v1();
	sp.className = 'highlight';
	this.el = sp;

	return sp;
}
module.exports = h;