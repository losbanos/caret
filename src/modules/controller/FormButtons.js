const c = {
	$container: '',
	$saveBtn: '',
	$nextBtn: '',
	init () {
		this.$container = $('#net');
		this.$saveBtn = $('#btn_save');
		this.$nextBtn = $('#btn_next');

		this.$container.on('click', '#btn_save', function (ev) {
			ev.stopImmediatePropagation()
			$.preventActions(ev);
			// var type = $(this).attr('id').replace('btn_', '');
			//
			// var datas = {
			// 	essay: $('#text_area').html(),
			// 	comment: $('#comments').html()
			// };
			// console.log('essay = ', JSON.stringify(datas.essay));
			// console.log('-------------------------------');
			// console.log('comment = ', JSON.stringify(datas.comment));
			let $h = $('#text_area').find('.highlight');
			$h.find('.e, .f').removeClass('e f').end();
			$h.replaceWith($h.html());
		})
	}
};
export default c;