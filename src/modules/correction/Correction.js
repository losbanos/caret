import '../addons/Utils';
import highLightNode from '../textview/HighlightNode';

const c = {
	text: '',
	$ta: null,
	$applyBtn: null, $moveBtn: null,
	curID: '',
	init() {
		this.$container = $('#correction');
		this.$ta = $('#ta_correction');
		this.$applyBtn = $('#btn_apply_correction');
		this.$moveBtn = $('#btn_change_message_position');

		this.deactivate();
		this.$applyBtn.on('click', this.apply.bind(this));
	},
	apply() {
		let id = this.curID;
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
		$msg.width($mark.width());

		if(this.$ta.val().length) {
			$msg.html(this.$ta.val().convertLineBreakToBR());
			$msg.insertBefore($f);

			$msg.on('click', function () {
				let $this = $(this);
				c.curID = $this.attr('id').replace('correction_', '');
				c.$ta.val($this.text());
			})
		}
		else {
			$msg.remove();
			c.curID = '';
		}
	},
	activate(id) {
		this.curID = id;
		this.$ta.val('');
		this.$applyBtn.attr('disabled', false);
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