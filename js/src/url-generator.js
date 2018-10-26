// these funcitons are called from the dom by cai-dom.js
// initialise the dom
// TODO refactor domElement to class object

// ENCOIDE tTHE SELCETD SUMMARY INTO THE URL

var selectedSummary;

function initUrlDom() {
	domElements.btnGenerateUrl = {
		el: $('#btn-generate-url'),
		type: 'btn',
		action: generateUrl,
	};

	domElements.btnPreviewUrl = {
		el: $('#btn-preview-url'),
		type: 'btn',
		action: previewUrl,
	};

	domElements.wrapperUrl = {
		el: $('#wrapper-url'),
	};

	domElements.wrapperSummary = {
		el: $('#wrapper-summary'),
	};

	domElements.selectSummary = {
		el: $('#select-summary'),
		type: 'select',
		action: selectSummary,
	};

	domElements.wrapperSnippet = {
		el: $('#wrapper-snippet'),
	};

	domElements.btnUrl = {
		el: $('#btn-url'),
		type: 'btn',
		action: retrieveBrief,
	};

	domElements.inputUrl = {
		el: $('#input-url'),
	};

	initSelect(domElements);
	initEls(domElements);
	initSnippets(domElements);

	// must be instaniated after the initSnippets func
	domElements.inputsFormCheck = {
		el: $('.form-check-input'),
	};
}

// If user pastes in an exisiting link, preselect those options (reverse search)
function retrieveBrief() {
	if (domElements.inputUrl.el.val()) {
		var customContent = getQueryPairs(
			domElements.inputUrl.el
				.val()
				.split('?')[1]
				.split('&')
		);
		if (customContent.content) {
			snippetsCodes = atob(decodeURIComponent(customContent.content)).split(',');
			loadSelectSnippets(snippetsCodes);
		}
		if (customContent.summary) {
			summaryCode = atob(decodeURIComponent(customContent.summary));
			loadSelectSummary(summaryCode);
		}
	}
}

// preselect snippets from retrieved url
function loadSelectSnippets(snippetsCodes) {
	var i = 0;
	$.each(domElements.inputsFormCheck.el, function(k, v) {
		if ($.inArray(i.toString(), snippetsCodes) !== -1) {
			$(v).attr('checked', true);
		} else {
			$(v).attr('checked', false);
		}
		i++;
	});
}

// preselect summary from retrieved url
function loadSelectSummary(summaryCode) {
	domElements.selectSummary.el.val(summaryCode);
}

// preload the select menu with all items from JSON
function initSelect(domElements) {
	contentSummaries = contentSummariesJson();
	$.each(contentSummaries, function(title, summary) {
		domElements.selectSummary.el.append('<option value="' + removeDots(title) + '">' + title + '</option>');
		domElements.wrapperSummary.el.append(
			'<div class="summary-snippet" id="' + removeDots(title) + '">' + summary + '</div>'
		);
	});

	showSelectedSummary();
}

function removeDots(string) {
	return string.replace(/\./g, '-');
}

// triggered when the select is changed
function selectSummary(el, props) {
	selectedSummary = props.el.val();
	console.log(selectedSummary);
	$('.shown')
		.removeClass('shown')
		.addClass('hidden');
	showSelectedSummary();
}

// hide/show the correct summary
function showSelectedSummary() {
	$('.summary-snippet').addClass('hidden');
	$('#' + selectedSummary)
		.addClass('shown')
		.removeClass('hidden');
}

// preload the select menu with all items from JSON
function initSnippets(domElements) {
	contentSnippets = contentSnippetsJson();
	$.each(contentSnippets, function(title, snippet) {
		domElements.wrapperSnippet.el.append(
			'<div class=" my-5 form-check pdf-snippet">' +
				'<input type="checkbox" class="form-check-input" id="' +
				title +
				'" />' +
				'<label class="form-check-label" for="checkbox-snippet-1">' +
				'<h5>' +
				title +
				'</h5>' +
				snippet +
				'</label>' +
				'</div>'
		);
	});

	showSelectedSummary();
}

// generate an encoded url
function generateUrl(el) {
	var generatedUrl = assembleUrl();

	// ADD TO CLIPBOARD add it to the dom
	copyToClipboard(generatedUrl);
	domElements.wrapperUrl.el.html(generatedUrl);
}

function previewUrl(el) {
	var generatedUrl = assembleUrl();

	if (validateSelection()) {
		window.open(generatedUrl, '_blank');
	}
}

function assembleUrl() {
	var generatedUrl;
	var formChecks = getFormChecks();
	var encodedSummary = encodeURIComponent(btoa(selectedSummary));
	var encodedChecks = encodeURIComponent(btoa(formChecks));
	if (validateSelection()) {
		generatedUrl = window.location.origin + '/brief-generator.html?content=' + encodedChecks;
		if (encodedSummary.length > 0) {
			generatedUrl += '&summary=' + encodedSummary;
		}
	} else {
		generatedUrl = 'Please check your selection and try again';
	}
	return generatedUrl;
}

function validateSelection() {
	return getFormChecks().length > 0 && selectedSummary.length > 0;
}

function copyToClipboard(text) {
	var $temp = $('<input>');
	$('body').append($temp);
	$temp.val(text).select();
	document.execCommand('copy');
	$temp.remove();
}

// check all checkboxes to see if checked and return as array
function getFormChecks() {
	var formChecks = [];
	$.each(domElements.inputsFormCheck.el, function(k, v) {
		if ($(v).is(':checked')) {
			formChecks.push(k);
		}
	});
	return formChecks;
}
