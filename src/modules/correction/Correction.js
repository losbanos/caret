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

		let ta = this.$ta.get(0);
		ta.addEventListener(EVENT.CORRECTION_ACTIVATE, c.activate.bind(this), true);
		ta.addEventListener(EVENT.CORRECTION_DEACTIVATE, c.deactivate.bind(this), true);
	},
	reset() {
        this.$container = $('#correction');
        this.$ta = $('#ta_correction');
        this.$applyBtn = $('#btn_apply_correction');
        this.$moveBtn = $('#btn_change_message_position');
        this.$applyBtn.on('click', this.apply.bind(this));

        let ta = this.$ta.get(0);
		ta.removeEventListener(EVENT.CORRECTION_ACTIVATE, c.activate);
		ta.removeEventListener(EVENT.CORRECTION_DEACTIVATE, c.deactivate);

        ta.addEventListener(EVENT.CORRECTION_ACTIVATE, c.activate.bind(this), true);
        ta.addEventListener(EVENT.CORRECTION_DEACTIVATE, c.deactivate.bind(this), true);
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
		let w = $mark.width()? $mark.width(): 40;
		$msg.width(w);

		if (this.$ta.val().length) {
			$msg.html(this.$ta.val().convertLineBreakToBR());
			$msg.insertBefore($f);
		}
		else {
			$msg.remove();
		}
	},
	activate(ev) {
		console.log('Correction activate from [', ev.detail.type,']');
		this.markID = ev.detail.id;
		if (!ev.detail.reactivate) this.$ta.val('');
		else c.$ta.val(ev.detail.text);

		this.$applyBtn.attr('disabled', false);
		this.$moveBtn.attr('disabled', false);
		this.$ta.removeAttr('readonly');
	},
	deactivate() {
		this.$applyBtn.attr('disabled', true);
		this.$moveBtn.attr('disabled', true);
		this.$ta.attr('readonly', 'readonly');
		this.$ta.val('');
	}

};
c.init();

export default c;