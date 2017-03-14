describe('all', function () {
	describe('load test', function () {
		before(function () {
			fixture.setBase('src/tpl');
		});
		beforeEach(function () {
			this.tpl = fixture.load('index.tpl.html')[0]
		});
		it('HTML 로드 체크', function () {
			let $contents = $(this.tpl).find('#tab_tit').find('a').eq(0);
			expect($contents.text()).to.equal('First');
		})
	})
});