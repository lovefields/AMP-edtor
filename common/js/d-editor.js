function dEditor(continer){
	var item = continer ? document.querySelector(continer) : document.getElementById('d-editor');
	if(item == null){
		console.warn('Please select existing element or make #d_editor element. [d-editor]');
		return false;
	}
	var fileReader = new FileReader();

	dEditor.item = item;

	dEditor.setArea = function(el){
		var html = '<div class="d-editor-area">';
		html += '<div class="d-editor-controll">';
		html += '<button class="d-btn d-btn-img">bold</button>';
		html += '<button class="d-btn d-btn-img">itelic</button>';
		html += '<button class="d-btn d-btn-img">underbar</button>';
		html += '<button class="d-btn d-btn-img">img</button>';
		html += '<button class="d-btn d-btn-img">img</button>';
		html += '<button class="d-btn d-btn-img">img</button>';
		html += '<button class="d-btn d-btn-img">img</button>';
		html += '</div>';
		html += '<div class="d-editor-document">';
		html += '<input type="file" accept="image/*" name="d-editor-image" id="d-editor-image" multiple hidden>';
		html += '<textarea name="d-editor-doc" id="d-editor-doc" hidden></textarea>';
		html += '<iframe src="./d-editor/textarea.html"></iframe>';
		html += '</div>';
		html += '</div>';

		this.item.innerHTML = html;
	}

	dEditor.setArea(item);

	return dEditor;
}