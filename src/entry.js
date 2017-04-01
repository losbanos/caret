import './css/basic.css';
import './css/layout.css';

import './modules/common/Sly';

import SortText from './modules/common/SortText';
import SelectText from './modules/actions/SelectText';

if(process.env.NODE_ENV !=='production') {
    // require('index.html');
}

$(document).ready(function () {
	let $ta = $('#text_area'),
		texts = SortText.init($ta.text())
	;
	SelectText.init($ta.html(texts));

});

