// will need global dom elements object
var domElements = {};

// kick off this party
$(window).on('load', function() {
	identifyDom();
});

function identifyDom() {
	if ($('.brief-generator__page').length) {
		console.log('brief page');
		initBriefDom();
	} else if ($('.url-generator__page').length) {
		console.log('url page');
		initUrlDom();
	} else if ($('.html-json__page').length) {
		console.log('html-json page');
		initJsonDom();
	} else {
		alert('no dom actions for this page');
	}
}

// initialise each element you need to act with - only use the domelements for this page, sent as args
function initEls(domElements) {
	$.each(domElements, function(el, props) {
		if (props.type === 'btn') {
			initButtons(el, props);
		}
		if (props.type === 'select') {
			initSelects(el, props);
		}
	});
}

// watch for clicks on dom elements
function initButtons(el, props) {
	props.el.on('click', function() {
		props.action(el);
	});
}

// watch for clicks on dom elements
function initSelects(el, props) {
	props.el.change(function() {
		props.action(el, props);
	});
}
