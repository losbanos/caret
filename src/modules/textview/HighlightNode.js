import uuid from 'uuid';
import _ from 'lodash';

import Comment from '../comment/Comment';
import Correction from '../correction/Correction';

const h = {
	$el: '',
	items: [],
	create () {
		let sp = document.createElement('span');
		sp.id = uuid.v1();
		sp.className = 'highlight';
		let $sp = $(sp);

		this.$el = $sp;
		$(sp).on('click', this.clicked.bind(sp));
		return $sp;
	},

	add (obj) {
		let origin = _.find(this.items, function (n) {
			return n.id === obj.id
		});
		if(origin) {
			$.extend(true, obj)
		}
		else {
			this.items.push(obj);
		}
		return this.items;
	},
	parse ($el) {
		if($el.text().length) {
			let r = $el.html().parseToTag();
			$el.html(r);

			$el.find('span').first().addClass('f').end().last().addClass('e');
		}
		return $el;
	},
	clicked() {
		let $this = $(this);
		$this.replaceWith($this.text());

		_.remove(h.items, function (n) {
			if( n.id === $this.attr('id')){
			}
		});
	},
	getCurrentItem() {
		return this.items[this.items.length -1 ];
	},
	getNonMarked () {
		return this.items.filter(function (n) {
			return n.marked === false;
		})
	},
	removeItem (id) {
		return _.remove(this.items, function (n) {
			return n.id === id;
		})
	},
	removeNonMarked() {
		let removed = _.remove(this.items, function (n) {

			return n.marked === false;
		});
		return removed;
	},
	setAttributes(obj) {

	},
	setType (type) {
		this.getCurrentItem().type = type;
	},
	setCurrentItemToMarked() {
		this.getCurrentItem().marked = true;
	},
	setItemToMarked(cur) {
		let item = _.find(this.items, {id: cur.id});
		item.marked = true;
	},

	openEdit(mark_id) {
		let cur = this.getCurrentItem();
		let data = {
			id:'comment_'+cur.id,
			index: this.items.length
		};
		switch (mark_id) {
			case 'cancel':
				Comment.add(data);
				Correction.activate(cur.id);
				break;
			case 'spacing':
				break;
			case 'paragraph':
				break;
			case 'linear':
				break;
		}
	},
	openCorrection() {

	}
};

export default h;

