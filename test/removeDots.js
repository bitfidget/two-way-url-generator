function test(then, expected) {
	results.total++;
	var result = removeDots('this.that.the.other', 'this-that-the-other');
	if (result !== expected) {
		results.bad++;
		console.log('Expected ' + expected + ', but was ' + result);
	}
}
var results = {
	total: 0,
	bad: 0,
};
test('arthur.marthur', 'arthur-marthur');
console.log(
	'Of ' + results.total + ' tests, ' + results.bad + ' failed, ' + (results.total - results.bad) + ' passed.'
);
