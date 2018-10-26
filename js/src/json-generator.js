function initJsonDom() {
	// TODO add the h5 element that shows the url
	domElements.btnGenerateJson = {};
	domElements.btnGenerateJson.el = $('#btn-generate-json');
	domElements.btnGenerateJson.type = 'btn';
	domElements.btnGenerateJson.action = generateJson;

	console.log(domElements.btnGenerateJson.el);

	domElements.inputString = {};
	domElements.inputString.el = $('#html-input');

	domElements.outputString = {};
	domElements.outputString.el = $('#json-output');

	initEls(domElements);
}

function generateJson() {
    domElements.outputString.content = JSON.stringify(domElements.inputString.el.val().replace(/  +/gm, ''));
    domElements.outputString.el.val(domElements.outputString.content)
}
