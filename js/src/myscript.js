/*!
 * PDF Generator JS
 *
 */

var url = window.location.href;
var urlSplit = url.split('#');
var urlQuery = urlSplit[1];
console.log(urlQuery);
var queryArray = urlQuery.split('-');
console.log(queryArray);

$.each(queryArray, function(index, snippet) {
  console.log(snippet)
  $('#snippet-' + snippet).show();
});


// Make PDF
$('#js-download__btn').click(function(){
  // Default export is a4 paper, portrait, using milimeters for units
  var doc = new jsPDF()

  doc.text('Hello world!', 10, 10)
  doc.save('a4.pdf')
})
