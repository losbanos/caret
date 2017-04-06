import './css/basic.css';
import './css/layout.css';
import './modules/common/Sly';

import MarkButtons from './modules/controller/MarkingButtons';
import SortText from './modules/common/SortText';
import SelectText from './modules/textview/SelectText';
import Comment from './modules/comment/Comment';
import TabContainer from './modules/snippet/TabContainer';

const FormButtons = '';
if (process.env.NODE_ENV !== 'production') {
	FormButtons = require('./modules/controller/FormButtons').default;
}

$(document).ready(function () {
	let $ta = $('#text_area'),
		texts = SortText.init($ta.text())
	;

	MarkButtons.init();
	SelectText.init($ta.html(texts));
	Comment.init();
	TabContainer.init();

	if (process.env.NODE_ENV !== 'production') {
		FormButtons.init();
	}
});

