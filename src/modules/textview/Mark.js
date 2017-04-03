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
		init () {
			// this.el.on('click', this.clicked);
			let $num = $('<span />', {class: 'mark-number info', text: '(' + this.index + ')'});
			$num.insertBefore($(this.el).find('.f'));
			return c;
		},
		clicked() {
			switch (this.type) {
				case 'cancel':
					Comment.activate({id: 'comment_' + this.id, index: this.index});
					Correction.activate(this.id, true);
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