function dEditor(continer){
	var item = continer ? document.querySelector(continer) : document.getElementById('d-editor');
	if(item == null){
		console.warn('Please select existing element or make "#d_editor" element. [d-editor]');
		return false;
	}
	var fileReader = new FileReader();

	dEditor.item = item;

	dEditor.setArea = function(el){
		var html = '<div class="d-editor-area">';
		html += '<div class="d-editor-controll01">';
		html += '<label for="d-editor-image" class="d-btn d-btn-img" title="Add image">img</label>';
		html += '<button class="d-btn d-btn-list01" title="Add list">list</button>';
		html += '<button class="d-btn d-btn-list02" title="Add oder list">oder list</button>';
		html += '<button class="d-btn d-btn-table" title="Add table">table</button>';
		html += '<button class="d-btn d-btn-code" title="Add code block">code block</button>';
		html += '<button class="d-btn d-btn-help" title="help">help</button>';
		html += '</div>';

		html += '<div class="d-editor-controll02">';
		html += '<select class="d-btn d-btn-fmaily" title="Font-family">';
		html += '<option value="">font-family</option>';
		html += '</select>';
		html += '<select class="d-btn d-btn-size" title="font-size">';
		html += '<option value="">font-size</option>';
		html += '</select>';
		html += '<button class="d-btn d-btn-b" title="bold">bold</button>';
		html += '<button class="d-btn d-btn-i" title="italic">italic</button>';
		html += '<button class="d-btn d-btn-u" title="underbar">underbar</button>';
		html += '<button class="d-btn d-btn-color" title="font-color">font-color</button>';
		html += '<button class="d-btn d-btn-bg" title="font-background">font-background</button>';
		html += '<button class="d-btn d-btn-align" title="text-align">text-align</button>';
		html += '<button class="d-btn d-btn-link" title="link">link</button>';
		html += '</div>';

		html += '<div class="d-editor-document">';
		html += '<input type="file" accept="image/*" name="d-editor-image" id="d-editor-image" multiple hidden>';
		html += '<textarea name="d-editor-doc-val" id="d-editor-doc-val" hidden></textarea>';
		html += '<div id="d-editor-doc-wrap" contenteditable="true"><div class="d-editor-doc"><p>&nbsp;</p></div></div>';
		//html += '<iframe src="./d-editor/textarea.html"></iframe>';
		html += '</div>';
		html += '</div>';

		this.item.innerHTML = html;
	}

	dEditor.setArea(item);

	return dEditor;
}