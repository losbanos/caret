import '../addons/Utils';
import highlightNode from '../textview/HighlightNode';

const c = {
    $carets: '',
    $buttons: '',
    init () {
        this.$carets = $('#caret_box');
        this.$buttons = this.$carets.find('button').attr('disabled', true);
    },
    activate(has_length) {
        this.$buttons.attr('disabled', true).removeClass('cursor');

        let target = '';
        if (has_length) {
            target = 'multi';
        }
        else {
            target = 'single';
        }

        this.$buttons.filter(function () {
            return this.getAttribute('class') === target;
        }).removeAttr('disabled').addClass('cursor');

        this.$carets.on('click', 'button', function (ev) {
            $.preventActions(ev);

            let $this = $(this),
                mark_id = $this.attr('id')
            ;
            let cur = highlightNode.getCurrentItem(),
                $cur = cur.$el,
                h = $cur.height()
            ;

            $cur.addClass(mark_id).removeClass('highlight');
            if (h > 20) {
                $cur.addClass('multi-line');
            }
            /* <-- HighlightNode 에서 처리하도록 수정 필요 */
            if (!$cur.children('.icon').length && mark_id === 'removeletter') {
                $cur.append($('<i />', {class: 'icon'}));
            }
            /* end --> */

            /*  paragraph 예외처리 시작 */
            if (mark_id === 'paragraph') {
                let $line = $('<span />', {class: 'paragraph'}),
                    $ta = $('#text_area'),
                    ty = $ta.scrollTop()
                ;
                let h = $cur.data('h');
                let data_ty = $cur.data('ty');

                $line.appendTo($ta)
                    .css({top: data_ty + ty, height: h})
                    .attr('id', cur.id);

                $cur.children('.f, .e').removeClass('f e');
                $cur.replaceWith($cur.html());
                highlightNode.add({id: cur.id, $el: $line});
            }
            /*  paragraph 예외처리 끝 */

            highlightNode.setType(mark_id);
            highlightNode.setCurrentItemToMarked();

            c.$buttons.attr('disabled', true).removeClass('cursor');
            c.$carets.off('click');

            highlightNode.getCurrentItem().openEdit();
        })
    },
    deactivate() {
        this.$carets.off('click');
        this.$buttons.attr('disabled', true).removeClass('cursor');
    }
};
module.exports = c;