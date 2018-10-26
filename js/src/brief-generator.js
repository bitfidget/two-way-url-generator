function initBriefDom() {
	// TODO add the content area and summary area
	domElements.snippetWrapper = {};
	domElements.snippetWrapper.el = $('#snippet-wrapper');

	domElements.summaryWrapper = {};
	domElements.summaryWrapper.el = $('#summary-wrapper');

	domElements.printBar = {};
	domElements.printBar.el = $('header').find('.print-bar');

	var customContent = getQueryPairs(window.location.search.substring(1).split('&'));

	if (customContent.content) {
		snippetsCodes = atob(decodeURIComponent(customContent.content)).split(',');
		displaySnippets(snippetsCodes);
	}
	if (customContent.summary) {
		summaryCode = atob(decodeURIComponent(customContent.summary));
		displaySummary(removeDashes(summaryCode));
	}

	displayDateTime();
}

function removeDashes(string) {
	return string.replace(/\-/g, '.');
}

// on load, pull the query string and interpret
// function getContentIdentifiers() {
// 	return getQueryPairs();
// }

// splits the query string into key value pair object
function getQueryPairs(queryStringSubsets) {
	var queryStringPairs = {};
	$.map(queryStringSubsets, function(n, i) {
		var splitPair = n.split('=');
		return (queryStringPairs[splitPair[0]] = splitPair[1]);
	});
	return queryStringPairs;
}

function displayDateTime() {
	var currentdate = new Date();
	var datetime =
		currentdate.getDate() +
		'/' +
		(currentdate.getMonth() + 1) +
		'/' +
		currentdate.getFullYear() +
		' @ ' +
		currentdate.getHours() +
		':' +
		(currentdate.getMinutes() < 10 ? '0' : '') +
		currentdate.getMinutes();
	domElements.printBar.el.html('Generated: ' + datetime);
}

// display each of the segmenst according to the suppleid codes
function displaySnippets(snippetCodes) {
	contentSnippets = contentSnippetsJson();
	var ret = '';
	var i = 0;
	$.each(contentSnippets, function(title, snippet) {
		if ($.inArray(i.toString(), snippetCodes) !== -1) {
			ret += '<div class="my-5 pdf-snippet"><h5>' + title + '</h5>' + snippet + '</div>';
		}
		i++;
	});

	domElements.snippetWrapper.el.html(ret);
}

// display the summary
function displaySummary(summaryCode) {
	contentSummaries = contentSummariesJson();
	var ret = '';
	$.each(contentSummaries, function(title, summary) {
		if (title === summaryCode) {
			ret = '<div class="summary-snippet" id="' + title + '">' + summary + '</div>';
		}
	});

	domElements.summaryWrapper.el.html(ret);
}
