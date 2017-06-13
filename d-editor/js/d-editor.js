function dEditor(continer){
	let item = continer ? document.querySelector(continer) : document.getElementById('d-editor');
	if (item == null) {
		console.warn('Please select existing element or make "#d_editor" element. [d-editor]');
		return false;
	}

	const tagREG = /[<>]/g;
	this.item = item;

	var html = '<div class="d-editor-area">';
	html += '<p hidden>This area is developer editor area</p>';
	html += '<div class="d-editor-controll01">';
	html += '<select class="d-btn-select d-btn-size" title="font-size">';
	html += '<option value="default">default</option>';
	html += '<option value="h6">h6</option>';
	html += '<option value="h5">h5</option>';
	html += '<option value="h4">h4</option>';
	html += '<option value="h3">h3</option>';
	html += '<option value="h2">h2</option>';
	html += '<option value="h1">h1</option>';
	html += '</select>';
	html += '<select class="d-btn-select d-btn-color" title="font-color">';
	html += '<option value="">font-color</option>';
	html += '</select>';
	html += '<select class="d-btn-select d-btn-bg" title="font-background">';
	html += '<option value="">font-background</option>';
	html += '</select>';
	html += '<button class="d-btn d-btn-b" title="bold"><span class="icon icon-bold"></span></button>';
	html += '<button class="d-btn d-btn-i" title="italic"><span class="icon icon-italic"></span></button>';
	html += '<button class="d-btn d-btn-u" title="underbar"><span class="icon icon-underline"></span></button>';
	html += '<button class="d-btn d-btn-align" title="align-left" data-type="text-align-left"><span class="icon icon-align-left"></span></button>';
	html += '<button class="d-btn d-btn-align" title="align-center" data-type="text-align-center"><span class="icon icon-align-center"></span></button>';
	html += '<button class="d-btn d-btn-align" title="align-right" data-type="text-align-right"><span class="icon icon-align-right"></span></button>';
	html += '<button class="d-btn d-btn-list01" title="Add list"><span class="icon icon-list-bullet"></span></button>';
	html += '<button class="d-btn d-btn-list02" title="Add oder list"><span class="icon icon-list-numbered"></span></button>';
	html += '<button class="d-btn d-btn-table" title="Add table"><span class="icon icon-table"></span></button>';
	html += '<button class="d-btn d-btn-code" title="Add code block"><span class="icon icon-code"></span></button>';
	html += '<button class="d-btn d-btn-help" title="help"><span class="icon icon-question-circle-o"></span></button>';
	html += '</div>';

	html += '<div class="d-editor-controll02">';
	html += '<label class="d-btn d-btn-link" title="link" data-tag="paragraph,ul,table,link">link <input type="text"><button class="d-add">Add</button><button class="d-del">delete</button></label>';
	html += '<label class="d-btn d-btn-table-type" title="table-type" data-tag="table"><span class="title">table type</span><button class="d-type" data-type="th">th</button><button class="d-type" data-type="td">td</button></label>';
	html += '<label class="d-btn d-btn-col" title="col" data-tag="table">col <input type="number" value="1" min="1" max="10"></label>';
	html += '<label class="d-btn d-btn-row" title="row" data-tag="table">row <input type="number" value="1" min="1"><button class="d-table-done">Table Remake</button></label>';
	html += '<label class="d-btn d-btn-lang" title="Language" data-tag="pre">Language';
	html += '<select>';
	html += '<option value="text">Text</option>';
	html += '<option value="html">HTML</option>';
	html += '<option value="css">CSS</option>';
	html += '<option value="javascript">Javascript</option>';
	html += '<option value="xml">json</option>';
	html += '<option value="php">PHP</option>';
	html += '<option value="java">Java</option>';
	html += '</select>';
	html += '</label>';
	html += '<label class="d-btn d-btn-list-type" title="List type" data-tag="ol">List Type';
	html += '<select>';
	html += '<option value="A">A</option>';
	html += '<option value="A">a</option>';
	html += '<option value="I">I</option>';
	html += '<option value="I">i</option>';
	html += '<option value="1">1</option>';
	html += '</select>';
	html += '</label>';
	html += '</div>';

	html += '<div class="d-editor-document">';
	html += '<textarea name="d-editor-doc-val" id="d-editor-doc-val" hidden></textarea>';
	html += '<iframe src="/d-editor/textarea.html" id="d-editor-doc-wrap"></iframe>';
	html += '</div>';
	html += '<div class="d-pop">';
	html += '<div class="d-pop-help">';
	html += '<p class="d-pop-title">작성법</p>';
	html += '<p>리스트를 추가한후에 엔터를 두번치면 다음 리스트로 넘어가지 않습니다.</p>';
	html += '<p>코드블럭및 테이블 안에서는 Shift + Enter 으로 줄바꿈을 해야합니다.</p>';
	html += '<p class="d-pop-title">단축키</p>';
	html += '<p>Ctrl + b : bold</p>';
	html += '<p>Ctrl + i : italic</p>';
	html += '<p>Ctrl + U : underline</p>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	this.item.innerHTML = html;

	let iframe = document.getElementById('d-editor-doc-wrap');

	//버튼 추가
	this.addBtn = function (element) {
		var reg = element.match(tagREG).length;
		if (reg % 2 == 0) {
			this.item.querySelector('.d-editor-controll01 .d-btn:first-of-type').insertAdjacentHTML('beforebegin', element);
		} else {
			console.warn('Please using HTMLString');
		}
	}

	// 속성 추가
	this.addAttr = function (element) {
		var reg = element.match(tagREG).length;
		if (reg % 2 == 0) {
			this.item.querySelector('.d-editor-controll02 *:first-child').insertAdjacentHTML('beforebegin', element);
		} else {
			console.warn('Please using HTMLString');
		}
	}

	// 텍스트 추가
	this.addText = function (string) {
		var reg = string.match(tagREG);
		if (reg == null || reg.length % 2 == 0) {
			iframe.contentWindow.addText(string);
		} else {
			console.warn('Please using HTMLString or String');
		}
	}

	// color option
	this.setColor = function (options) {
		var html = '<option value="default">default</option>';
		options.forEach((e) => {
			html += '<option value="' + e.class + '">' + e.name + '</option>';
		});
		this.item.querySelector('.d-btn-color').innerHTML = html;
	}

	// background option
	this.setBg = function (options) {
		var html = '<option value="default">default</option>';
		options.forEach((e) => {
			html += '<option value="' + e.class + '">' + e.name + '</option>';
		});
		this.item.querySelector('.d-btn-bg').innerHTML = html;
	}

	// submit
	this.submit = function() {
		var val = iframe.contentWindow.docValue();
		this.item.querySelector('#d-editor-doc-val').innerHTML = val;
	}

	// 도움말
	this.item.querySelector('.d-btn-help').addEventListener('click', () => {
		this.item.querySelector('.d-pop').classList.add('act');
	});
	this.item.querySelector('.d-pop').addEventListener('click', () => {
		this.item.querySelector('.d-pop').classList.remove('act');
	});

	// bold
	this.item.querySelector('.d-btn-b').addEventListener('click', () => {
		iframe.contentWindow.bold();
		iframe.focus();
	});

	// italic
	this.item.querySelector('.d-btn-i').addEventListener('click', () => {
		iframe.contentWindow.italic();
		iframe.focus();
	});

	// underline
	this.item.querySelector('.d-btn-u').addEventListener('click', () => {
		iframe.contentWindow.underline();
		iframe.focus();
	});

	// align-left
	[].forEach.call(this.item.querySelectorAll('.d-btn-align'),function(align){
		align.addEventListener('click', () => {
			var type = align.getAttribute('data-type');
			iframe.contentWindow.alignText(type);
			iframe.focus();
		});
	});

	// 순서없는 리스트 추가
	this.item.querySelector('.d-btn-list01').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.addList('ul');
	});

	// 순서있는 리스트 추가
	this.item.querySelector('.d-btn-list02').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.addList('ol');
	});

	// code block
	this.item.querySelector('.d-btn-code').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.codeBlock();
	});

	// table
	this.item.querySelector('.d-btn-table').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.addTable();
	});

	// font size
	this.item.querySelector('.d-btn-size').addEventListener('change',function(){
		var val = this.value;
		iframe.focus();
		iframe.contentWindow.fontSize(val);
	});

	// font color
	this.item.querySelector('.d-btn-color').addEventListener('change',function(){
		var val = this.value;
		iframe.focus();
		iframe.contentWindow.elementColor(val,'color');
	});

	// bg color
	this.item.querySelector('.d-btn-bg').addEventListener('change',function(){
		var val = this.value;
		iframe.focus();
		iframe.contentWindow.elementColor(val,'bg');
	});

	// add link
	this.item.querySelector('.d-btn-link .d-add').addEventListener('click', () => {
		var link = this.item.querySelector('.d-btn-link input').value;
		iframe.focus();
		iframe.contentWindow.addLink(link);
	});
	// del link
	this.item.querySelector('.d-btn-link .d-del').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.delLink();
	});

	// table rewrite
	this.item.querySelector('.d-btn-row .d-table-done').addEventListener('click', () => {
		var row = this.item.querySelector('.d-btn-row input').value;
		var col = this.item.querySelector('.d-btn-col input').value;
		iframe.focus();
		iframe.contentWindow.reWriteTable(row,col);
	});

	// table type
	[].forEach.call(this.item.querySelectorAll('.d-btn-table-type .d-type'),(el) => {
		el.addEventListener('click', () => {
			var type = el.getAttribute('data-type');
			iframe.focus();
			iframe.contentWindow.tabelType(type);
		});
	});
	

	iframe.onload = function(){
		iframe.contentDocument.addEventListener('click',function(e){
			iframe.contentWindow.checkDoc(e);
		});

		iframe.contentDocument.addEventListener('keydown',function(e){
			iframe.contentWindow.checkDoc(e);
		});
	}
}