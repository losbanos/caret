import './css/basic.css';
import './css/layout.css';
import './modules/common/Sly';

import MarkButtons from './modules/controller/MarkingButtons';
import SortText from './modules/common/SortText';
import SelectText from './modules/textview/SelectText';

if (process.env.NODE_ENV !== 'production') {
	// require('index.html');
}

$(document).ready(function () {
	let $ta = $('#text_area'),
		texts = SortText.init($ta.text())
	;
	MarkButtons.init();
	SelectText.init($ta.html(texts));

});

