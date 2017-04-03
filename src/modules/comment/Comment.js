import Mustache from 'mustache';
import _ from 'lodash';

import '../addons/Utils';
import './CommentBox';
import highlightNode from '../textview/HighlightNode';

const c = {
	items: [],
	$container: '',
	$list: '',
	template: '',
	init () {
		this.$container = $('#comment_area');
		this.$list = $('#comments');
		this.template = $('#tpl_comment').html();
	},
	add (data) {
		data.index = this.items.length ? this.items.length + 1: 1;

		let comm = Mustache.render(this.template, data);
		this.$list.append(comm);

		let $li = $('#' + data.id);
        $li.comment({
            $removeBtn: $li.find('button'),
            $view: $li.find('.view'),
            $ta: $li.find('textarea'),
            onRemove: function () {c.removeItem(data.id); c.sortItems()}
        });
        this.items.push($li);
        this.$list.find('li').removeClass('active');
		$li.addClass('active');

        this.sortItems()
	},
	activate (data) {
		let $el = _.find(this.items, function(n){ return n.attr('id') === data.id });
		if($el !== void 0) {
			this.$container.animate({scrollTop: $el.position().top}, 400);
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
            let num = i +1;
            n.find('.comment-index').text(num+'.');
        });
        return this.items;
    },
}
module.exports = c;