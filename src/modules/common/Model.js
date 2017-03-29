import _ from 'lodash';
/**
 *
 * @param items { Array }
 * 				Structure: {id: {String}, text: {String}, node: {DOM Element}, marked: {Boolean}
 *
 */
const model = {
	items: [],
	counter: 0,
	removeItem (idx) {
		return this.items.splice(idx, 1);
	},
	addItem(obj) {
		this.items.push(obj);
	},
	getItem(idx) {
		return this.items[idx];
	},
	getNonMarked () {
		return this.items.filter(function (n) {
			return n.marked === false;
		})
	},
	removeNonMarkedItem() {
		return _.remove(this.items, function (n) {
			return n.marked === false;
		});
	},
	removeAllItems() {
		this.items.splice(0, this.items.length);
	},
	getCurrentItem() {
		return this.items[this.items.length -1 ];
	},
	getCounter() {
		this.counter = this.items.length;
		return this.counter
	},
	setCurrentItemToMarked() {
		this.getCurrentItem().marked = true;
	},
	setItemToMarked(cur) {
		let item = _.find(this.items, {id: cur.id});
		item.marked = true;
	}
};

export default model;