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
		this.activateComment(data.id);
	},
	activateComment (id) {
		let $li = $('#' + id);
		$li.comment({
			$removeBtn: $li.find('button'),
			$view: $li.find('.view'),
			$ta: $li.find('textarea'),
			onRemove: function (id) {
				// $('#' + id).recoverText();
				// highlightNode.removeItem(id);
			}
		})
	},
	remove () {

	}
}
module.exports = c;