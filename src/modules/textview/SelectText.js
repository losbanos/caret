import '../addons/Utils';
import HighLightNode from './HighlightNode';
import MarkingButtons from '../controller/MarkingButtons';
import Comment from '../comment/Comment';
const c = {
	$ta: '',
	init ($ta, obj) {
		this.$ta = $ta;
		if (obj && obj.reload) {
			this.reload();
		}
		$ta.mousedown(function () {
			if (HighLightNode.items.length) {
				c.removeNonMarked();
				c.deactivateController();
			}
		})
			.mouseup(c.mark)
			.on('mouseleave', function () {
				let sel = window.getSelection();
				sel.removeAllRanges();
			})
	},
	mark (ev) {
		let nonOccurs = ['correction-msg', 'comment-msg', 'paragraph', 'info', 'mark-number', 'period', 'comman', 'linebreak'],
			$ta = $(ev.target),
			stopOccur = false
		;
		if ($ta.is('span')) {
			$.each(nonOccurs, function (i, n) {
				if ($ta.hasClass(n)) {
					stopOccur = true;
					return false
				}
			})
		}
		if (stopOccur) return false;

		let $sp = HighLightNode.create(),
			sel = window.getSelection(),
			ori_range = '',
			sel_text = ''
		;

		if (sel) {
			if (sel.rangeCount) {
				ori_range = sel.getRangeAt(0);
				sel_text = sel.toString();
				let range = ori_range.cloneRange();
				try {
					let sc = range.startContainer.parentNode,
						ec = range.endContainer.parentNode
					;

					/*text-area 더블클릭 으로 인한 오류처리*/
					if($(sc).attr('class') === 'contents-body' || $(ec).attr('class') === 'contents-body') {
						sel.removeAllRanges();
						return false;
					}
					/*text-area 더블클릭 으로 인한 오류처리 끝*/

					if (sel_text) {
						$sp = HighLightNode.parse(sc, ec, $sp);
					}
					else {
						range.surroundContents($sp.get(0));
					}
					sel.removeAllRanges();
					sel.addRange(range);

					let $cur_el = $('#' + $sp.attr('id'));
					let h = 16;
					if($cur_el.children('.e').length) {
						h = $cur_el.children('.e').position().top;
					}
					$cur_el.data({'ty': $cur_el.position().top, 'h': h});

					HighLightNode.add({ id: $sp.attr('id'), text: sel_text, $el: $cur_el, marked: false});
                    sel.removeAllRanges();

					c.activateController(sel_text);
				}
				catch (e) {
					console.warn(e);
					if ($sp) alert('Not Selectable');
					sel.removeAllRanges()
				}
			}
		}
	},
	destory() {
		this.$ta.off('click');
	},
	removeNonMarked () {
		HighLightNode.removeNonMarked().forEach(function (n) {
			let $n = $('#' + n.id);
			$n.children('.f, .e').removeClass('f e');
			$n.replaceWith($n.html());
		})
	},
	activateController(selected_text) {
		let is_multi_mark = selected_text.length ? 1 : 0;
		MarkingButtons.activate(is_multi_mark);
	},
	deactivateController() {
		MarkingButtons.deactivate();
	},

	reload() {
		this.$ta.find('.active-block').removeClass('active-block');
		let $hl = this.$ta.find('.highlight').each(function () {
			$(this).children('.f, .e').removeClass('f e');
		});
		$hl.replaceWith($hl.html());

		let $sp = this.$ta.find('.cancel, .stitch, .removeletter, .paragraph, .linear, .spacing, .period, .comma, .linebreak, .indent');
		$sp.each(function () {
			let $this = $(this);
			let type = $this.attr('class').replace('cursor', '').replace('active-block', '').replace(/\s+/g, '');
			HighLightNode.add({id: $this.attr('id'), text: $this.text(), $el: $('#'+$this.attr('id')), marked: true, type: type});
		});
		HighLightNode.reload();
		Comment.reload();
	}
};

module.exports = c;