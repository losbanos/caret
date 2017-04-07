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
			c.$ta_correction = $('#ta_correction');

			if(c.$el && c.$el.length) {
				c.$el.get(0).addEventListener(EVENT.MARK_ACTIVE, c.activeByComment);

				c.$el.on('contextmenu', function(ev) {
					ev.stopImmediatePropagation();
					let m = confirm('Are you sure you want to delete?');
					if(m) {
						console.log('삭제한다!')
						try{
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
					case 'linear':
						this.$el.on('click', this.clicked);
						break;
					default:
						this.$el.on('click', this.clicked);
				}
				c.$el.on('contextmenu', function(ev) {
					ev.stopImmediatePropagation();
					let m = confirm('Are you sure you want to delete?');
					if(m) {
						console.log('삭제한다!')
						try{
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
		addNumbering() {

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
			HighlightNode.setAllMarkCommentIndex();
		},

		clicked(ev) {
			ev.stopImmediatePropagation();
			let event;
			switch (c.type) {
				case 'cancel':
					Comment.activate({id: 'comment_' + c.id, index: c.index, commentIndex: c.commentIndex});
					HighlightNode.removeLinearColor();
					c.$el.addClass('active-block');

					event = new CustomEvent(EVENT.CORRECTION_ACTIVATE, {
							detail:{id: c.id, text: c.getCorrectionText(), reactivate: true, type:'cancel'} }
					);
					c.$ta_correction.get(0).dispatchEvent(event);
					break;
				case 'paragraph':
					Comment.activate({id: 'comment_' + c.id, index: c.index, commentIndex: c.commentIndex});
					HighlightNode.removeLinearColor();
					Correction.deactivate();
					c.$el.addClass('active-block');
					break;
				case 'linear':
					Comment.activate({id: 'comment_' + c.id, index: c.index, commentIndex: c.commentIndex});
					HighlightNode.removeLinearColor();
                    Correction.deactivate();
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
			let event,
				$msg = this.$el ? this.$el.children('.mark-number'): $('#'+this.id).children('.mark-number');
			;
			if($msg.length) {
				this.commentIndex = $msg.text().match(/\d+/g)[0]
			}
			switch (c.type) {
				case 'cancel':
					this.addNumbering();
					Comment.add({id: 'comment_' + this.id, index: this.index, commentIndex: this.commentIndex});
					HighlightNode.removeLinearColor();

					event = new CustomEvent(EVENT.CORRECTION_ACTIVATE, {
						detail:{id: this.id, text: this.getCorrectionText(), reactivate: false, from:'mark'} }
					);
					this.$ta_correction.get(0).dispatchEvent(event);
					this.$el.on('click', this.clicked.bind(this)).addClass('cursor active-block');
					break;
				case 'paragraph':
					this.addNumbering();
					Comment.add({id: 'comment_' + this.id, index: this.index, commentIndex: this.commentIndex});
					HighlightNode.removeLinearColor();
					Correction.deactivate();
					c.$el.on('click', this.clicked).addClass('cursor active-block');
					break;
				case 'linear':
					this.addNumbering();
					Comment.add({id: 'comment_' + this.id, index: this.index, commentIndex: this.commentIndex});
					HighlightNode.removeLinearColor();
                    Correction.deactivate();
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
		remove(caller) {
			if(caller === void 0) {
				c.removeCommentIndex();
				c.removeCorrection();
				c.$el.removeMark();
			}
			else {
				if(!c.getCorrectionText().length) {
					c.removeCommentIndex();
					c.removeCorrection();
					c.$el.removeMark();
				}
				else {
					c.removeCommentIndex();
				}
			}
			let event = new CustomEvent(EVENT.MARK_REMOVE, {
				detail: {
					id: c.id, type: c.type, commentIndex: c.commentIndex
				}
			});
			$('#text_area').trigger(EVENT.MARK_REMOVE, [event]);
			$('#ta_correction').trigger(EVENT.MARK_REMOVE, [event]);
			$('#comments').trigger(EVENT.MARK_REMOVE, [event]);
		},

		removeCommentIndex() {
			try{
				c.$el = c.$el? c.$el : $('#'+c.id);
				let $number = c.$el.children('.mark-number');
				if($number.length && $number) {
					$number.remove();
				}
			}
			catch(e) {
				console.warn(e)
			}
		},
		removeCorrection() {
			try{
				c.$el = c.$el? c.$el : $('#'+c.id);
				let $msg = c.$el.children('.correction-msg');
				if($msg.length && $msg) {
					$msg.remove();
				}
			}
			catch(e) {
				console.log(e);
			}
		},
		getIndex() {
			return this.index;
		},
		setIndex(number) {
			this.index = number;
			return c;
		},
		setMarkNumbering(num) {
			c.commentIndex = num;
			c.$el.children('.mark-number').text('('+num+')');
			//Comments
		},
		getText() {
			return this.text;
		},
		setCorrectionTextLog(text) {
			let $msg = this.$el.children('.correction-msg');
			this.correctionText = text;
		},
		getCorrectionText() {
			let $msg = this.$el.children('.correction-msg');
			if($msg.length) {
				this.correctionText = $msg.html();
			}
			else {
				this.correctionText = '';
			}
			return this.correctionText;
		},
		activeByComment() {
			let event,
				ta = $('#ta_correction').get(0)
			;
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
			console.log('Event = ', event);
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