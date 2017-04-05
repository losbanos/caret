import _ from 'lodash';
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
			switch(c.type) {
				case 'cancel': c.displayCommentIndex(); break;
				case 'paragraph': c.displayCommentIndex(); break;
				case 'linear': c.displayCommentIndex(); break;
			}
			c.$ta_correction = $('#ta_correction');

			if(c.$el.length) {
				c.$el.get(0).addEventListener(EVENT.MARK_ACTIVE, c.activeByComment);

				c.$el.on('contextmenu', function(ev) {
					ev.stopImmediatePropagation();
					let m = confirm('Are you sure you want to delete?');
					if(m) {
						console.log('삭제한다!')
						let event = new CustomEvent(EVENT.MARK_REMOVE, {
							detail: {
								id: c.id, type: c.type
							}
						});
						try{
							c.removeCommentIndex();
							c.remove();
						}
						catch(e){
							console.log(e);
						}
						finally {
							return false;
						}
					}
					else return false;

				});
			}
			return c;
		},
		reset(){
            c.$ta_correction = $('#ta_correction');
            c.$el= $('#'+c.$el.attr('id'));
            if(c.$el.length) {
				c.$el.get(0).removeEventListener(EVENT.MARK_ACTIVE, c.activeByComment);
				c.$el.get(0).addEventListener(EVENT.MARK_ACTIVE, c.activeByComment, true);

				switch(c.type) {
					case 'cancel':
						this.$el.on('click', this.clicked.bind(this));
						break;
					case 'paragraph':
						this.$el.on('click', this.clicked);
						break;
					case 'spacing':
						this.$el.on('click', this.clicked);
						break;
				}
			}
            return c;
		},
		displayCommentIndex() {
			this.commentIndex = Comment.getCommentLength() + 1;
            let $num = $('<span />', {class: 'mark-number info', text: '(' + this.commentIndex + ')'});
            switch(c.type) {
				case 'cancel':
						$num.insertBefore($(this.$el).children('.f'));
					break;
				case 'paragraph':
						this.$el.append($num);
					break;
				case 'linear':
					this.$el.append($num);
					break;
			}
		},

		clicked(ev) {
			ev.stopImmediatePropagation();
			let event;
			switch (c.type) {
				case 'cancel':
					Comment.activate({id: 'comment_' + this.id, index: this.index});
					HighlightNode.removeLinearColor();
					this.$el.addClass('active-block');

					event = new CustomEvent(EVENT.CORRECTION_ACTIVATE, {
							detail:{id: this.id, text: this.getCorrectionText(), reactivate: true, type:'cancel'} }
					);
					this.$ta_correction.get(0).dispatchEvent(event);
					break;
				case 'paragraph':
					Comment.activate({id: 'comment_' + this.id, index: this.index});
					HighlightNode.removeLinearColor();
					Correction.deactivate();
					c.$el.addClass('active-block');
					break;
				case 'linear':
					Comment.activate({id: 'comment_' + this.id, index: this.index});
					HighlightNode.removeLinearColor();
					c.$el.addClass('active-block');
					break;
				case 'spacing':
					HighlightNode.removeLinearColor();
					c.$el.addClass('active-block');

					event = new CustomEvent(EVENT.CORRECTION_ACTIVATE, {
						detail:{id: this.id, text: c.getCorrectionText(), reactivate: true, type: 'spacing'} }
					);
					c.$ta_correction.get(0).dispatchEvent(event);
					break;
			}
			return c;
		},
		openEdit() {
			let event;
			switch (c.type) {
				case 'cancel':
					Comment.add({id: 'comment_' + this.id, index: this.index});
					HighlightNode.removeLinearColor();

					event = new CustomEvent(EVENT.CORRECTION_ACTIVATE, {
						detail:{id: this.id, text: this.getCorrectionText(), reactivate: false, from:'mark'} }
					);
					this.$ta_correction.get(0).dispatchEvent(event);
					this.$el.on('click', this.clicked.bind(this)).addClass('cursor active-block');
					break;
				case 'paragraph':
					Comment.add({id: 'comment_' + this.id, index: this.index});
					HighlightNode.removeLinearColor();
					Correction.deactivate();
					c.$el.on('click', this.clicked).addClass('cursor active-block');
					break;
				case 'linear':
					Comment.add({id: 'comment_' + this.id, index: this.index});
					HighlightNode.removeLinearColor();
					c.$el.on('click', this.clicked).addClass('cursor active-block');
					break;
				case 'spacing':
					event = new CustomEvent(EVENT.CORRECTION_ACTIVATE, {
						detail:{id: this.id, text: this.getCorrectionText(), reactivate: false, from:'mark'} }
					);
					this.$ta_correction.get(0).dispatchEvent(event);
					c.$el.on('click', this.clicked).addClass('cursor active-block');
					break;
			}

			return c;
		},
		removeCommentIndex() {
			try{
				let $msg = c.$el.children('.mark-number');
				if($msg.length) {
					$msg.remove();
				}
			}
			catch(e) {
				console.warn(e)
			}
		},
		remove() {
			c.$el.removeMark();

			$('#text_area').trigger(EVENT.MARK_REMOVE, [event]);
			$('#ta_correction').trigger(EVENT.MARK_REMOVE, [event]);
			$('#comments').trigger(EVENT.MARK_REMOVE, [event]);
		},
		getIndex() {
			return this.index;
		},
		setIndex(number) {
			this.index = number;
			return c;
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

		activeByMark() {
			console.log('active By Mark');
		},
		activeByComment() {
			let event,
				ta = $('#ta_correction').get(0)
			;
			console.log('activebyComment')
			HighlightNode.removeLinearColor();
			c.$el.addClass('active-block');

			switch(c.type) {
				case 'cancel':
					event = new CustomEvent(EVENT.CORRECTION_ACTIVATE, {
						detail:{
							id: c.id, text: c.getCorrectionText(),
							from:'mark', reactivate: true} });
					break;
				case 'paragraph':
					event = new CustomEvent(EVENT.CORRECTION_DEACTIVATE, { detail: {id: c.id}});
					break;
				case 'linear':
					event = new CustomEvent(EVENT.CORRECTION_DEACTIVATE, { detail: {id: c.id}});
					break;
			}
			ta.dispatchEvent(event);
		},
		update(obj) {
			_.forEach(obj, function (v, k) {
				c[k] = v
			})
		}

	};
	c = $.extend(true, c, dataObj);
	return c;
}