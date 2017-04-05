import Mustache from 'mustache';
import _ from 'lodash';

import '../addons/Utils';
import './CommentBox';
import EVENT from '../common/Events';

const c = {
	items: [],
	$container: '',
	$list: '',
	template: '',
	init () {
		this.$container = $('#comment_area');
		this.$list = $('#comments');
		this.template = $('#tpl_comment').html();
		this.$list.on(EVENT.MARK_REMOVE, this.remove);
	},
	reset() {
		init();
		this.$list.on(EVENT.MARK_REMOVE, this.remove);
	},
	add (data) {
		data.index = this.items.length ? this.items.length + 1 : 1;

		let comm = Mustache.render(this.template, data);
		this.$list.append(comm);

		let $li = $('#' + data.id);
		$li.comment({
			$removeBtn: $li.find('button'),
			$view: $li.find('.view'),
			$ta: $li.find('textarea'),
			onRemove: function () {
				c.removeItem(data.id);
				c.sortItems()
			},
		}).on('edit', function (ev, $el) {
			c.$list.find('li').removeClass('active');
			$el.addClass('active');
			let event = new CustomEvent(EVENT.MARK_ACTIVE, {
				detail: {id: $el.attr('id').replace('comment_', ''), $el: $el, $list: c.$list, from: 'comment'}
			});
			$('#'+event.detail.id).get(0).dispatchEvent(event);
		});

		this.items.push($li);
		this.$list.find('li').removeClass('active');
		$li.addClass('active');

		this.sortItems()
	},
	activate (data) {
		let $el = _.find(this.items, function (n) {
			return n.attr('id') === data.id
		});
		if ($el !== void 0) {
			this.$container.animate({scrollTop: $el.position().top + 100}, 400);
			this.$list.find('li').removeClass('active');
			$el.addClass('active');
		}
		else {
			this.add(data);
		}
	},
	removeItem(id) {
		return _.remove(this.items, function (n) {
			return n.attr('id') === id;
		})
	},
	sortItems() {
		this.items.forEach(function (n, i) {
			let num = i + 1;
			n.find('.comment-index').text(num + '.');
		});
		return this.items;
	},
	getCommentLength() {
		return this.items.length;
	},
	remove () {
		console.log('comment remove');
	}
}
export default c;