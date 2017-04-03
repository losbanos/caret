import uuid from 'uuid';
import _ from 'lodash';

import Mark from './Mark';
import EVENT from '../common/Events';

const h = {
	$el: '',
	items: [],
	create () {
		let sp = document.createElement('span');
		sp.id = uuid.v1();
		sp.className = 'highlight';
		let $sp = $(sp);

		this.$el = $sp;
		$(sp).on('click', this.doubleClicked.bind(sp));
		return $sp;
	},

	add (obj) {
		let newOne = new Mark(obj);
		this.items.push(newOne);
		return this.items;
	},
	parse (sc, ec, $el) {
		if (!$el) $el = this.$el;

		sc.setAttribute('class', 'f');
		ec.setAttribute('class', 'e');
		let $sc = $(sc);
		let result = $sc.nextUntil(ec).add($sc).add(ec);
		try {
			result.each(function (i, n) {
				let $this = $(this);
				let eid = $el.attr('id');
				let pid = $this.parent('span').length ? $this.parent().attr('id') : eid;

				if ($this.parent('span').length) {
					if (pid !== eid) {
						sc.setAttribute('class', '');
						ec.setAttribute('class', '');
						throw new Error('nested select');
					}
				}
			});
			result = result.wrapAll($el);
			return $el;
		}
		catch (e) {
			alert('Not Selectable');
			console.log(e);
		}
		return false;
	},
	doubleClicked() {
		let $this = $(this);
		$this.replaceWith($this.text());

		_.remove(h.items, function (n) {
			if (n.id === $this.attr('id')) {
			}
		});
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
			return n.marked === false;
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
			n.el.removeClass('active-block');
		})
	},
	activeByComment(ev) {
		let $comments = ev.detail.$list;
		$comments.find('li').each(function (i, n) {
			let mid = n.id.replace('comment_', '');
			$('#'+mid).removeClass('active-block');
		});

		$('#'+ev.detail.id).addClass('active-block').trigger(EVENT.MARK_ACTIVE);
	}
};
window.addEventListener(EVENT.COMMENT_ACTIVE, h.activeByComment);
export default h;

