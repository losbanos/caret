import uuid from 'uuid';
import _ from 'lodash';

import Mark from './Mark';
import EVENT from '../common/Events';

const h = {
	$el: '',
	$ta: $('#text_area'),
	items: [],
	create () {
		let sp = document.createElement('span');
		sp.id = uuid.v1();
		sp.className = 'highlight';
		let $sp = $(sp);

		this.$el = $sp;
		return $sp;
	},

	add (obj) {
		let o =_.find(this.items, function (n) {return n.id === obj.id});

		if(!o) {
			let newOne = new Mark(obj);
			this.items.push(newOne);
		}
		else {
			o.update(obj);
		}
		this.reset();
		return this.items;
	},
	reset() {
        this.items.forEach(function (v, i) {
            v.reset();
        });
        return this.items;
	},
	parse (sc, ec, $el) {
		if (!$el) $el = this.$el;

		sc.setAttribute('class', 'f');
		ec.setAttribute('class', 'e');
		let $sc = $(sc), $ec = $(ec),
			result = $sc.nextUntil(ec).add($sc).add(ec),
			parentID_f = $sc.parent().attr('id'),
			parentID_e = $ec.parent().attr('id')
		;
		if(parentID_f!==parentID_e) {
			sc.setAttribute('class', '');
			ec.setAttribute('class', '');
			throw new Error('nested select');
		}
		result = result.wrapAll($el);
		return $el;
	},
	getCurrentItem() {
		return this.items[this.items.length - 1];
	},
	getNonMarked () {
		return this.items.filter(function (n) {
			return n.marked === false;
		})
	},
	removeItem (id) {
		_.remove(this.items, function (n) {
			return n.id === id;
		});
		return this.sortItemsByIndex()
	},
	removeNonMarked() {
		let removed = _.remove(this.items, function (n) {
			return !n.marked
		});
		this.sortItemsByIndex();
		return removed;
	},
	sortItemsByIndex() {
		this.items = _.orderBy(this.items, 'index', 'asc');
		this.items = _.forEach(this.items, function (n, i) {
			n.index = i + 1;
		});
		return this.items;
	},
	setType (type) {
		this.getCurrentItem().type = type;
	},
	setCurrentItemToMarked() {
		this.getCurrentItem().marked = true;
		this.getCurrentItem().setIndex(this.items.length).init()
	},
	removeLinearColor() {
		this.items.forEach(function (n) {
			n.$el.removeClass('active-block');
		})
	},
	activeByComment(ev) {
		let $comments = ev.detail.$list;
		$comments.find('li').each(function (i, n) {
			let mid = n.id.replace('comment_', '');
			$('#'+mid).removeClass('active-block');
		});

		$('#'+ev.detail.id).addClass('active-block').trigger(EVENT.COMMENT_ACTIVE);
	},
	remove(ev, param) {
		_.remove(h.items, function (n) {
			return n.id === param.detail.id;
		});
		h.reset();
		h.setAllMarkIndex()
	},
	setAllMarkIndex () {
		let arr = _.filter(this.items, function (n) {
			let type = n.type;
			return (/(cancel|paragraph|linear)/g).test(type);
		});
		arr.forEach(function (n, i) {
			n.setMarkNumbering(i + 1);
		});
	}
};
let $ta = $('#text_area');
if($ta.length) {
	$ta.get(0).addEventListener(EVENT.COMMENT_ACTIVE, h.activeByComment, true);
	$ta.on(EVENT.MARK_REMOVE, h.remove);
}

export default h;

