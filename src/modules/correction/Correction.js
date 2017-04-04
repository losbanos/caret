import '../addons/Utils';
import EVENT from '../common/Events';
import highLightNode from '../textview/HighlightNode';

const c = {
	text: '',
	$ta: null,
	$applyBtn: null, $moveBtn: null,
	markID: '',
	init() {
		this.$container = $('#correction');
		this.$ta = $('#ta_correction');
		this.$applyBtn = $('#btn_apply_correction');
		this.$moveBtn = $('#btn_change_message_position');

		this.deactivate();
		this.$applyBtn.on('click', this.apply.bind(this));

		this.$ta.get(0).addEventListener(EVENT.MARK_CLICK, c.showText, true);
	},
	apply() {
		let id = this.markID;
		console.log('correction mark id = ', id);

		let correction_id = 'correction_' + id,
			$mark = $('#' + id),
			ty = this.$ta.scrollTop(),
			$f = $mark.children('.f'),
			$msg
		;
		if (!$mark.children('.correction-msg').length) {
			$msg = $('<span />', {class: 'correction-msg info', id: correction_id}).appendTo($mark);
		}
		else {
			$msg = $mark.children('.correction-msg');
		}
		$msg.width($mark.width());

		if (this.$ta.val().length) {
			$msg.html(this.$ta.val().convertLineBreakToBR());
			$msg.insertBefore($f);
		}
		else {
			$msg.remove();
		}
	},
	activate(id, reactivate) {
		this.markID = id;
		if (!reactivate) this.$ta.val('');

		this.$applyBtn.attr('disabled', false);
		this.$moveBtn.attr('disabled', false);
		this.$ta.removeAttr('readonly');
	},
	deactivate() {
		this.$applyBtn.attr('disabled', true);
		this.$moveBtn.attr('disabled', true);
		this.$ta.attr('readonly', 'readonly');
	},
	showText (ev) {
		c.$ta.val(ev.detail.text);
		this.markID = ev.detail.id;
	}
};
c.init();

export default c;