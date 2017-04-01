import '../addons/Utils';
import highLightNode from '../textview/HighlightNode';

const c = {
	text: '',
	$ta: null,
	$applyBtn: null, $moveBtn: null,
	init() {
		this.$container = $('#correction');
		this.$ta = $('#ta_correction');
		this.$applyBtn = $('#btn_apply_correction');
		this.$moveBtn = $('#btn_change_message_position');

		this.deactivate();
	},
	apply(id) {
		console.log('mark id = ',id);
		let cur_id = 'correction_'+id,
			$mark = $('#'+id),
			$msg = $('<span />', {class: 'correction-msg', id:cur_id}).appendTo($mark)
		;
		let offsetY = $mark.position().top + this.$ta.scrollTop() + 20;
		$msg.html(this.$ta.val().convertLineBreakToBR())

	},
	activate(id) {
		this.$applyBtn.attr('disabled', false).click( this.apply.bind(this, id));
		this.$moveBtn.attr('disabled', false);
		this.$ta.removeAttr('readonly');
	},
	deactivate() {
		this.$applyBtn.attr('disabled', true);
		this.$moveBtn.attr('disabled', true);
		this.$ta.attr('readonly', 'readonly');
	}
};
c.init();
export default c;