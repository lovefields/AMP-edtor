function dEditor(continer) {
	const tagREG = /[<>]/g;
	let item = continer ? document.querySelector(continer) : document.getElementById('d-editor');
	if (item == null) {
		console.warn('Please select existing element or make "#d_editor" element. [d-editor]');
		return false;
	}
	var fileReader = new FileReader();

	this.item = item;

	var html = '<div class="d-editor-area">';
	html += '<p hidden>This area is developer editor area</p>';
	html += '<div class="d-editor-controll01">';
	html += '<select class="d-btn-select d-btn-size" title="font-size">';
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
	html += '<button class="d-btn d-btn-align-left" title="align-left"><span class="icon icon-align-left"></span></button>';
	html += '<button class="d-btn d-btn-align-center" title="align-center"><span class="icon icon-align-center"></span></button>';
	html += '<button class="d-btn d-btn-align-right" title="align-right"><span class="icon icon-align-right"></span></button>';
	html += '<button class="d-btn d-btn-list01" title="Add list"><span class="icon icon-list-bullet"></span></button>';
	html += '<button class="d-btn d-btn-list02" title="Add oder list"><span class="icon icon-list-numbered"></span></button>';
	html += '<button class="d-btn d-btn-table" title="Add table"><span class="icon icon-table"></span></button>';
	html += '<button class="d-btn d-btn-code" title="Add code block"><span class="icon icon-code"></span></button>';
	html += '<button class="d-btn d-btn-help" title="help"><span class="icon icon-question-circle-o"></span></button>';
	html += '</div>';

	html += '<div class="d-editor-controll02">';
	html += '<label class="d-btn d-btn-link" title="link" data-tag="p,li,a">link <input type="text"></label>';
	html += '<label class="d-btn d-btn-w" title="width" data-tag="img,table">width <input type="number"></label>';
	html += '<label class="d-btn d-btn-h" title="height" data-tag="img">height <input type="number"></label>';
	html += '<label class="d-btn d-btn-col" title="col" data-tag="table">col <input type="number"></label>';
	html += '<label class="d-btn d-btn-row" title="row" data-tag="table">row <input type="number"></label>';
	html += '<label class="d-btn d-btn-row" title="Language" data-tag="pre,code">Language';
	html += '<select>';
	html += '<option value="text">text</option>';
	html += '<option value="html">html</option>';
	html += '<option value="css">css</option>';
	html += '<option value="javascript">javascript</option>';
	html += '<option value="xml">xml</option>';
	html += '<option value="php">php</option>';
	html += '<option value="java">java</option>';
	html += '</select>';
	html += '</label>';
	html += '</div>';

	html += '<div class="d-editor-document">';
	html += '<textarea name="d-editor-doc-val" id="d-editor-doc-val" hidden></textarea>';
	html += '<div id="d-editor-doc-wrap" contenteditable="true"><div class="d-editor-doc"><p></p></div></div>';
	html += '</div>';
	html += '</div>';
	this.item.innerHTML = html;

	/* 함수 */
	// 버튼 컨트롤러 추가
	this.addBTN = function (element) {
		var reg = element.match(tagREG).length;
		if(reg%2 == 0){
			this.item.querySelector('.d-editor-controll01 .d-btn:first-child').insertAdjacentHTML('beforebegin', element);;
		}else{
			console.warn('Please using HTMLString');
		}
	}

	// 속성 컨트롤러 추가
	this.addAttr = function(tag,string){

	}

	//내용 삽입
	this.addText = function (string) {
		var reg = string.match(tagREG);
		if(reg == null || reg.length%2 == 0){
			this.item.querySelector('.d-editor-doc').innerHTML += '<p>' + string + '</p>';
		}else{
			console.warn('Please using HTMLString or String');
		}
	}

	this.submit = function(){
		var text = this.item.querySelector('#d-editor-doc-wrap').innerHTML;
		this.item.querySelector('#d-editor-doc-val').value = text;
	}

	/* 동작 */
	this.item.querySelector('.d-btn-list01').addEventListener('click',() => {
		this.item.querySelector('.d-editor-doc').innerHTML += '<ul><li></li></ul><p></p>';
	});

	this.item.querySelector('.d-btn-list02').addEventListener('click',() => {
		this.item.querySelector('.d-editor-doc').innerHTML += '<ol><li></li></ol><p></p>';
	});

	//기본구조 유지 스크립트.
	var keydownTimer;
	this.item.querySelector('#d-editor-doc-wrap').addEventListener('keydown',(e) => {
		clearTimeout(keydownTimer);
		keydownTimer = setTimeout(() => {
			var html = this.item.querySelector('#d-editor-doc-wrap').innerHTML;
			if(html == ''){
				this.item.querySelector('#d-editor-doc-wrap').innerHTML = '<div class="d-editor-doc"><p></p></div>';
			}else{
				var target = e.target;
				function getChild(el){
					console.log(el.lastChild.constructor);
					console.log(el.lastChild.lastChild.lastChild.constructor == Text);
				}
				getChild(target);
				//console.log(e.target.lastChild);
				//this.item.querySelector('.d-editor-doc').innerHTML = this.item.querySelector('.d-editor-doc').innerHTML.replace('div','p');
			}
		},250);
	});
}