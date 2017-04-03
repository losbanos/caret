import HighlightNode from './HighlightNode';
import Comment from '../comment/Comment';
import Correction from '../correction/Correction';
import EVENT from '../common/Events';

export default function (dataObj) {
	let c = {
		id: '',
		el: '',
		type: '',
		marked: false,
		text: '',
		index: 0,
		commentIndex: 0,
		init () {
			// this.el.on('click', this.clicked);
			switch(this.type) {
				case 'cancel': this.displayCommentIndex(); break;
				case 'paragraph': this.displayCommentIndex(); break;
			}

			return c;
		},
		displayCommentIndex() {
			this.commentIndex = Comment.getCommentLength() + 1;
            let $num = $('<span />', {class: 'mark-number info', text: '(' + this.commentIndex + ')'});
            $num.insertBefore($(this.el).children('.f'));
		},
		clicked() {
			switch (this.type) {
				case 'cancel':
					Comment.activate({id: 'comment_' + this.id, index: this.index});
					Correction.activate(this.id, true);
					let event = new CustomEvent(EVENT.MARK_CLICK, {
							detail:{}
							}
						);
					document.dispatchEvent(event);
					HighlightNode.removeLinearColor();
					this.el.addClass('active-block');
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
					this.el.on('click', this.clicked.bind(this)).addClass('cursor active-block');
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
		getCorrection() {

		},
		setCorrection() {

		},
		removeCorrection() {

		},
		getText() {
			return this.text;
		},
		remove() {

		},
		activeByMark() {
			console.log('active By Mark');
		}

	};
	c = $.extend(true, c, dataObj);
	$(c.el).on(EVENT.MARK_ACTIVE, c.activeByMark());
	return c;
}