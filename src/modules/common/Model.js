const model = {
	items: [],
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
		return this.items.filter(function (n, i) {
			return !n.marked
		})
	},
	markingItem (id) {

	},
	removeAllItems() {

	},
	getCurrentItem() {
		return this.items[this.items.length -1 ];
	}
};

export default model;