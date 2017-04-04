import HighlightNode from './HighlightNode';
import Comment from '../comment/Comment';
import Correction from '../correction/Correction';
import EVENT from '../common/Events';

export default function (dataObj) {
	let c = {
		id: '',
		$el: '',
		type: '',
		marked: false,
		text: '',
		index: 0,
		commentIndex: 0,
		correctionText: '',
		$ta_correction: '',
		init () {
			switch(this.type) {
				case 'cancel': this.displayCommentIndex(); break;
				case 'paragraph': this.displayCommentIndex(); break;
			}

			this.$ta_correction = $('#ta_correction');
			c.$el.get(0).addEventListener(EVENT.COMMENT_ACTIVE, c.activeByComment, true);
			return c;
		},
		displayCommentIndex() {
			this.commentIndex = Comment.getCommentLength() + 1;
            let $num = $('<span />', {class: 'mark-number info', text: '(' + this.commentIndex + ')'});
            $num.insertBefore($(this.$el).children('.f'));
		},
		clicked() {
			switch (this.type) {
				case 'cancel':
					Comment.activate({id: 'comment_' + this.id, index: this.index});
					Correction.activate(this.id, true);
					HighlightNode.removeLinearColor();
					this.$el.addClass('active-block');

					let	event = new CustomEvent(EVENT.MARK_CLICK, {
							detail:{id: this.id, text: this.getCorrectionText()} }
					);
					this.$ta_correction.get(0).dispatchEvent(event);
					break;
				case 'paragraph':
					break;
				case 'linear':
					break;
			}
			return c;
		},
		openEdit() {
			switch (this.type) {
				case 'cancel':
					Comment.add({id: 'comment_' + this.id, index: this.index});
					Correction.activate(this.id, false);
					HighlightNode.removeLinearColor();
					this.$el.on('click', this.clicked.bind(this)).addClass('cursor active-block');
					break;
				case 'paragraph':
					break;
				case 'linear':
					break;
			}
			return c;
		},
		getIndex() {
			return this.index;
		},
		setIndex(number) {
			this.index = number;
			return c;
		},
		getComment() {

		},
		setComment() {

		},
		removeComment() {

		},
		removeCorrection() {

		},
		getText() {
			return this.text;
		},
		getCorrectionText() {
			let $msg = this.$el.children('.correction-msg');
			if($msg.length) {
				return this.correctionText = $msg.text();
			}
			else {
				return '';
			}
		},
		remove() {

		},
		activeByMark() {
			console.log('active By Mark');
		},
		activeByComment() {
			let	event = new CustomEvent(EVENT.MARK_CLICK, {
				detail:{id: this.id, text: c.getCorrectionText()} }
			);
			$('#ta_correction').get(0).dispatchEvent(event);
		}

	};
	c = $.extend(true, c, dataObj);
	return c;
}