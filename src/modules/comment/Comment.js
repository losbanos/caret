import Mustache from 'mustache';
import './CommentBox';

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
	},
	edit (id) {
		$(id).addClass('edit');
	},
	active() {

	},
	remove () {

	}
}
module.exports = c;