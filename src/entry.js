import './css/basic.css';
import './css/layout.css';

import './modules/common/sly';

import SortText from './modules/common/SortText';
import TextSelect from './modules/actions/TextSelect';

if(process.env.NODE_ENV !=='production') {
    // require('index.html');
}

$(document).ready(function () {
	let $ta = $('#text_area'),
		texts = SortText.init($ta.text());

	TextSelect.init($ta.html(texts));
});

