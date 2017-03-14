import './css/basic.css';
import './css/layout.css';

import './modules/common/sly';
import textSelect from './modules/io/TextSelect';

if(process.env.NODE_ENV !=='production') {
    // require('index.html');
}

$(document).ready(function () {
	let $ta = $('#text_area'),
		texts = $ta.text().replace(/(\r\n|\r|\n)/g, '<br />').replace(/(\s{2,}|$\s{2,})/, '');

	textSelect.init($ta.html(texts));
});

