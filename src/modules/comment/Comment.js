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

		this.$list.off(EVENT.MARK_REMOVE);
		this.$list.off(EVENT.SNIPPET_CLICK);

		this.$list.on(EVENT.MARK_REMOVE, this.remove);
		this.$list.on(EVENT.SNIPPET_CLICK, this.addSnippet);
	},
	reset() {
		this.$container = $('#comment_area');
		this.$list = $('#comments');
		this.template = $('#tpl_comment').html();

		this.$list.off(EVENT.MARK_REMOVE);
		this.$list.off(EVENT.SNIPPET_CLICK);

		this.$list.on(EVENT.MARK_REMOVE, this.remove);
		this.$list.on(EVENT.SNIPPET_CLICK, this.addSnippet);
	},
	add (data) {
		let comm = Mustache.render(this.template, data);
		this.$list.append(comm);
		let $li = $('#' + data.id);
		$li.comment({
			$removeBtn: $li.find('button'),
			$view: $li.find('.view'),
			$ta: $li.find('textarea'),
			onRemove: function () {
				c.removeItem(this.attr('id'));
			},
		}).on('edit', function (ev, $el) {
			c.$list.find('li').removeClass('active');
			$el.addClass('active');
			let event = new CustomEvent(EVENT.MARK_ACTIVE, {
				detail: {id: $el.attr('id').replace('comment_', ''), $el: $el, $list: c.$list, from: 'comment'}
			});
			$('#' + event.detail.id).get(0).dispatchEvent(event);
		});

		this.items.push($li);
		this.sortDOMList($li);
		/*sortDOMList 이후에 active */
		$li.addClass('active');
		this.sortNumbering();

		let ty = $li.position().top + this.$container.scrollTop();
		this.$container.animate({scrollTop: ty}, 400);
	},
	sortDOMList($li) {
		let num = parseInt($li.find('.comment-index').text().replace('.', ''));
		this.$list.find('li').removeClass('active').each(function () {
			let $this = $(this),
				li_num = parseInt($this.find('.comment-index').text().replace('.', '')),
				isBefore = (num - li_num == -1) ? true : false
			;
			if (isBefore) {
				$li.insertBefore($this);
			}
		});
	},
	activate (data) {
		let $el = _.find(this.items, function (n) {
			return n.attr('id') === data.id
		});
		if ($el !== void 0) {
			$el.find('.comment-head').click();
			let ty = $el.position().top + this.$container.scrollTop();
			this.$container.animate({scrollTop: ty}, 400);
			this.$list.find('li').removeClass('active');
			$el.addClass('active');
		}
		else {
			this.add(data);
		}
	},
	removeItem(id) {
		let removed = _.remove(this.items, function (n) {
			return n.attr('id') === id;
		});
		c.sortNumbering();
		let arr = [];
		$.each(this.items, function (i, n) {
			arr[i] = n.attr('id').replace('comment_', '');
		});

		$('#text_area').trigger(EVENT.COMMENT_REMOVE, [id.replace('comment_', ''), arr]);
	},
	sortNumbering() {
		this.items.forEach(function (n, i) {
			let num = i + 1;
			n.find('.comment-index').text(num + '.');
		});
		return this.items;
	},
	getCommentLength() {
		return this.items.length;
	},
	getCommentNumbering() {
        let arr = [];
        $.each(this.items, function (i, n) {
            arr[i] = {id: n.attr('id').replace('comment_', ''), commentIndex: i + 1}
        });
        return arr;
	},
	remove (ev, params) {
		let id = 'comment_' + params.detail.id;

		$('#' + id).remove();
		_.remove(c.items, function (n) {
			return n.attr('id') === id;
		});
		c.sortNumbering();
        $('#text_area').trigger(EVENT.RESET_COMMENT_INDEX, [id.replace('comment_', '')]);
	},

	addSnippet(ev, htmls) {
		let commentBox = c.$list.find('.active').find('textarea').val(htmls)
			.end().data('comment');
		if(commentBox) commentBox.inputText();
	},

	reload() {
		this.reset();
		this.items = this.items || [];
		this.$list.find('li').each(function () {
			let $li = $(this);
			$li.comment({
				$removeBtn: $li.find('button'),
				$view: $li.find('.view'),
				$ta: $li.find('textarea'),
				onRemove: function () {
					c.removeItem(this.attr('id'));
				},
			}).on('edit', function (ev, $el) {
				c.$list.find('li').removeClass('active');
				$el.addClass('active');
				let event = new CustomEvent(EVENT.MARK_ACTIVE, {
					detail: {id: $el.attr('id').replace('comment_', ''), $el: $el, $list: c.$list, from: 'comment'}
				});
				$('#' + event.detail.id).get(0).dispatchEvent(event);
			});
			$li.data('comment').hide();
			c.items.push($li);
		});
	}
};
export default c;