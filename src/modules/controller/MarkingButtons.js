import '../addons/Utils';
import model from '../common/Model';

const c = {
	$carets: '',
	$buttons: '',
	$targetCarets: '',
	init () {
		this.$carets = $('#caret_box');
		this.$buttons = this.$carets.find('button').attr('disabled', true);
	},
	activate(has_length) {
		this.$buttons.attr('disabled', true).removeClass('cursor');

		let target = '';
		if (has_length) {
			target = 'multi';
		}
		else {
			target = 'single';
		}

		this.$buttons.filter(function () {
			return this.getAttribute('class') === target;
		}).removeAttr('disabled').addClass('cursor');

		this.$carets.on('click', 'button', function (ev) {
			$.preventActions(ev);

			let $this = $(this),
				mark_id = $this.attr('id')
			;
			let cur = model.getCurrentItem(),
				$cur = $(cur.node),
				h = $cur.height()
			;
			$cur.addClass(mark_id).removeClass('highlight');
			if(h > 20 ) { $cur.addClass('multi-line'); }
			/*HighlightNode 에서 처리하도록 수정 필요 */
			if(!$cur.children('.icon').length && mark_id === 'removeletter'){
				$cur.append($('<i />',{class:'icon'}));
			}

			model.setCurrentItemToMarked();

			c.$buttons.attr('disabled', true).removeClass('cursor');
			c.$carets.off('click');
		})
	},
	handleMark(ev) {

	},
	deactivate() {
		this.$carets.off('click');
	}
};
module.exports = c;