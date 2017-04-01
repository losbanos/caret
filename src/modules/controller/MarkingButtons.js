import '../common/jquery.common';

const MarkingButtons = {
	$container: '',
	$triggers: '',
	init ($container, $triggers) {
		this.$container = $container;
		this.$triggers = $triggers

	},
	activate() {
		this.$container.on('click', this.$triggers, function (ev) {
			$.preventActions(ev);

			let $this = $(this),
				mark_id = $this.attr('id')
			;

		})
	},
	deactivate() {
		this.$container.off('click');

	}
}
module.exports = MarkingButtons;