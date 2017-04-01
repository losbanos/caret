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
		console.log('correction mark id = ',id);
		let cur_id = 'correction_'+id,
			$mark = $('#'+id),
			ty = this.$ta.scrollTop(),
        	$f = $mark.children('.f'),
			$msg
		;
		if(!$mark.children('.correction-msg').length) {
            $msg = $('<span />', {class: 'correction-msg', id:cur_id}).appendTo($mark);
		}
		else {
			$msg = $mark.children('.correction-msg');
		}
		$msg.html(this.$ta.val().convertLineBreakToBR());
		$msg.insertBefore($f);
		$msg.off('click');

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
	},
	showText () {

	}
};
c.init();
export default c;