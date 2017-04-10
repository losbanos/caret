import './Tab';
import EVENT from '../common/Events';

const c = {

	init () {
		this.$tabTits = $('#tab_tit');
		this.$tabContents = $('#tab_contents');
		this.$comments = $('#comments');

		this.$tabTits.tab();
		this.copyTextToComment();
	},
	copyTextToComment () {
		this.$tabContents.on('click','.comment-tpl', function (ev) {
			ev.stopImmediatePropagation();
			let htmls = $(this).find('.desc-text').html();
			c.$comments.trigger(EVENT.SNIPPET_CLICK, [htmls]);
		})
	}
};
c.init();
export default c;