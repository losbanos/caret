import './css/basic.css';
import './css/layout.css';

import './modules/common/sly';

import SortText from './modules/common/SortText';
import SelectText from './modules/textview/SelectText';

if(process.env.NODE_ENV !=='production') {
    // require('index.html');
}

$(document).ready(function () {
	let $ta = $('#text_area'),
		texts = SortText.init($ta.text())
	;
	SelectText.init($ta.html(texts));

});

