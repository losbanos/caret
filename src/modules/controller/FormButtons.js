const c = {
	$container: '',
	$saveBtn: '',
	$nextBtn: '',
	init () {
		this.$container = $('#net');
		this.$saveBtn = $('#btn_save');
		this.$nextBtn = $('#btn_next');

		this.$container.on('click', 'button', function (ev) {
			$.preventActions(ev);
			var type = $(this).attr('id').replace('btn_', '');

			var datas = {
				essay: $('#text_area').html(),
				comment: $('#comments').html()
			};
			console.log('essay = ', JSON.stringify(datas.essay));
			console.log('-------------------------------');
			console.log('comment = ', JSON.stringify(datas.comment));
			switch(type) {
				case 'save':
					$.ajax({
						type:'',
						url: '',
						data: datas,
						success: function (result) {

						}
					})
					break;
				case 'next':
					break;
			}
		})
	}
};
export default c;