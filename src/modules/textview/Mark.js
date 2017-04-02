import HighlightNode from './HighlightNode';
import Comment from '../comment/Comment';
import Correction from '../correction/Correction';

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
            return c;
        },
        clicked() {
            switch (this.type) {
                case 'cancel':
                    Comment.activate({id: 'comment_' + this.id, index: this.index});
                    Correction.activate(this.id);
                    HighlightNode.removeLinearColor();
                    this.el.addClass('yellow-block');
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
                    Correction.activate(this.id);
                    this.el.on('click', this.clicked.bind(this)).addClass('cursor');
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

        }

    };
    c = $.extend(true, c, dataObj);

    return c;
}