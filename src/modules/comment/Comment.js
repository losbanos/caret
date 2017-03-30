import Mustache from 'mustache';

import '../addons/Utils';
import './CommentBox';
import highlightNode from '../textview/HighlightNode';

const c = {
	items: [],
	$container: '',
	template: '',
	init () {
		this.$container = $('#comments');
		this.template = $('#tpl_comment').html();
	},
	add (data) {
		let comm = Mustache.render(this.template, data);
		this.$container.append(comm);
		this.edit(data.id);
	},
	edit (id) {
		let $li = $('#' + id);
		$li.comment({
			$removeBtn: $li.find('button'),
			$view: $li.find('.view'),
			$ta: $li.find('textarea'),
			onRemove: function (id) {
				$('#' + id).recoverText();
				console.log(highlightNode.items);
			}
		})
	},
	active() {

	},
	remove () {

	}
}
module.exports = c;