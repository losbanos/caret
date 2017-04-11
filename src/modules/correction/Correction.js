import '../addons/Utils';
import EVENT from '../common/Events';
import highLightNode from '../textview/HighlightNode';

const c = {
	text: '',
	$ta: null,
	$applyBtn: null, $changePositionBtn: null,
	markID: '',
	init() {
		this.$container = $('#correction');
		this.$ta = $('#ta_correction');
		this.$applyBtn = $('#btn_apply_correction');
		this.$changePositionBtn = $('#btn_change_position');

		this.deactivate();
		this.$applyBtn.on('click', this.apply.bind(this));
		this.$changePositionBtn.on('click', this.changePosition);

		this.$ta.get(0).addEventListener(EVENT.CORRECTION_ACTIVATE, c.activate.bind(this), true);
		this.$ta.get(0).addEventListener(EVENT.CORRECTION_DEACTIVATE, c.deactivate.bind(this), true);
		this.$ta.on(EVENT.MARK_REMOVE, this.deactivate);

		this.$ta.on('keydown', function (ev) {
			if(ev.which === 13 && ev.ctrlKey) {
				c.apply();
			}});
	},
	reset() {
        this.$container = $('#correction');
        this.$ta = $('#ta_correction');
        this.$applyBtn = $('#btn_apply_correction');
        this.$changePositionBtn = $('#btn_change_position');
        this.$applyBtn.on('click', this.apply.bind(this));

		this.$ta.get(0).removeEventListener(EVENT.CORRECTION_ACTIVATE, c.activate);
		this.$ta.get(0).removeEventListener(EVENT.CORRECTION_DEACTIVATE, c.deactivate);

		this.$ta.get(0).addEventListener(EVENT.CORRECTION_ACTIVATE, c.activate.bind(this), true);
		this.$ta.get(0).addEventListener(EVENT.CORRECTION_DEACTIVATE, c.deactivate.bind(this), true);
        this.$ta.on('keydown', function (ev) {
            if(ev.which === 13 && ev.ctrlKey) {
                c.apply();
            }});
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

		if (this.$ta.val().length) {
			let htmls = this.$ta.val().convertLineBreakToBR();
			$msg.html(htmls);
			$msg.insertBefore($f);
			if($msg.hasClass('up')) {
				$msg.css('top', $msg.height() * -1);
			}
		}
		else {
			$msg.remove();
		}
	},
	activate(ev) {
		// console.log('Correction activate from [', ev.detail.type,']');
		this.markID = ev.detail.id;
		if (!ev.detail.reactivate) this.$ta.val('');
		else {
			c.$ta.val(ev.detail.text.convertBRtoLineBreak());
		}

		this.$applyBtn.attr('disabled', false);
		this.$moveBtn.attr('disabled', false);
		this.$ta.removeAttr('readonly');
	},
	deactivate() {
		this.$applyBtn = $('#btn_apply_correction');
		this.$applyBtn.attr('disabled', true);

		this.$moveBtn= $('#btn_change_message_position');
		this.$moveBtn.attr('disabled', true);

		this.$ta = $('#ta_correction');
		this.$ta.attr('readonly', 'readonly');
		this.$ta.val('');
	},
	changePosition() {
		let $mark = $('#'+c.markID);
		if($mark.attr('class').indexOf('spacing') > -1) { return; }
		let $msg = $mark.children('.correction-msg');
		if($mark.length && $msg.length) {
			let h = $msg.height();
			if($msg.hasClass('up')) {
				$msg.removeClass('up').removeAttr('style');
			}
			else {
				$msg.addClass('up').css('top', -1* h);
			}
		}
	}

};
c.init();

export default c;