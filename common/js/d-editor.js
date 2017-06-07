function dEditor(continer) {
	const tagREG = /[<>]/g;
	let item = continer ? document.querySelector(continer) : document.getElementById('d-editor');
	if (item == null) {
		console.warn('Please select existing element or make "#d_editor" element. [d-editor]');
		return false;
	}
	let sel = window.getSelection();

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
	html += '<label class="d-btn d-btn-link" title="link" data-tag="*,(pre)">link <input type="text"></label>';
	html += '<label class="d-btn d-btn-max-w" title="width" data-tag="table">max-width <input type="number"></label>';
	html += '<label class="d-btn d-btn-min-w" title="width" data-tag="table">min-width <input type="number"></label>';
	html += '<label class="d-btn d-btn-col" title="col" data-tag="table">col <input type="number"></label>';
	html += '<label class="d-btn d-btn-row" title="row" data-tag="table">row <input type="number"></label>';
	html += '<label class="d-btn d-btn-lang" title="Language" data-tag="pre">Language';
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
	html += '<div class="d-pop">';
	html += '<div class="d-pop-help">';
	html += '<p>작성법</p>';
	html += '<p>리스트를 추가한후에 엔터를 두번치면 다음 리스트로 넘어가지 않습니다.</p>';
	html += '<p>코드블럭 안에서는 Shift + Enter 으로 줄바꿈을 해야합니다.</p>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	this.item.innerHTML = html;

	// 선택자
	this.doc = this.item.querySelector('.d-editor-doc');

	/* 함수 */
	// 버튼 컨트롤러 추가
	this.addBTN = function (element) {
		var reg = element.match(tagREG).length;
		if (reg % 2 == 0) {
			this.item.querySelector('.d-editor-controll01 .d-btn:first-of-type').insertAdjacentHTML('beforebegin', element);
		} else {
			console.warn('Please using HTMLString');
		}
	}

	// 속성 컨트롤러 추가
	this.addAttr = function (element) {
		var reg = element.match(tagREG).length;
		if (reg % 2 == 0) {
			this.item.querySelector('.d-editor-controll02 *:first-child').insertAdjacentHTML('beforebegin', element);
		} else {
			console.warn('Please using HTMLString');
		}
	}

	// 내용 삽입
	this.addText = function (string) {
		var reg = string.match(tagREG);
		if (reg == null || reg.length % 2 == 0) {
			this.item.querySelector('.d-editor-doc').innerHTML += '<p>' + string + '</p>';
		} else {
			console.warn('Please using HTMLString or String');
		}
	}

	// 컬러 설정
	this.setColor = function (options) {
		var html = '<option value="default">default</option>';
		options.forEach((e) => {
			html += '<option value="' + e.class + '">' + e.name + '</option>';
		});
		this.item.querySelector('.d-btn-color').innerHTML = html;
	}

	// 컬러 설정
	this.setBg = function (options) {
		var html = '<option value="none">none</option>';
		options.forEach((e) => {
			html += '<option value="' + e.class + '">' + e.name + '</option>';
		});
		this.item.querySelector('.d-btn-bg').innerHTML = html;
	}

	// 현재 노드에 따른 속성
	this.checkDoc = function () {
		var el = sel.focusNode.parentElement;
		if (el.className !== 'd-editor-doc') {
			var attr = this.item.querySelectorAll('.d-editor-controll02 label');
			[].forEach.call(attr,(e) => {e.classList.remove('act');});
			console.log(el.constructor);
			switch (el.constructor) {
				case HTMLParagraphElement:
					[].forEach.call(attr,(e) => {
						if(/[*]|paragraph/i.test(e.getAttribute('data-tag'))){
							e.classList.add('act');
						}
					});
					break;
			}
		}
	}

	// focus
	this.focus = function(){
		document.getElementById('d-editor-doc-wrap').focus();
	}

	// 값 추출
	this.submit = function () {
		var text = this.item.getElementById('d-editor-doc-wrap').innerHTML;
		this.item.getElementById('d-editor-doc-val').value = text;
	}

	/* 동작 */
	// 볼드
	this.item.querySelector('.d-btn-b').addEventListener('click', () => {
		document.execCommand('bold', true, null);
	});

	// 이텔릭
	this.item.querySelector('.d-btn-i').addEventListener('click', () => {
		document.execCommand('italic', true, null);
	});

	// 밑줄
	this.item.querySelector('.d-btn-u').addEventListener('click', () => {
		document.execCommand('underline', true, null);
	});

	// 왼쪽 정렬
	this.item.querySelector('.d-btn-align-left').addEventListener('click', () => {
		var el = sel.focusNode.parentNode;
		if (el.className !== 'd-editor-doc') {
			el.classList.remove('text-align-center', 'text-align-right');
			el.classList.add('text-align-left');
		}
	});

	// 가운데 정렬
	this.item.querySelector('.d-btn-align-center').addEventListener('click', () => {
		var el = sel.focusNode.parentNode;
		if (el.className !== 'd-editor-doc') {
			el.classList.remove('text-align-right', 'text-align-left');
			el.classList.add('text-align-center');
		}
	});

	// 왼쪽 정렬
	this.item.querySelector('.d-btn-align-right').addEventListener('click', () => {
		var el = sel.focusNode.parentNode;
		if (el.className !== 'd-editor-doc') {
			el.classList.remove('text-align-center', 'text-align-left');
			el.classList.add('text-align-right');
		}
	});

	// 순서없는 리스트 추가
	this.item.querySelector('.d-btn-list01').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<ul><li></li></ul>');
		this.checkDoc();
	});

	// 순서있는 리스트 추가
	this.item.querySelector('.d-btn-list02').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<ol><li></li></ol>');
		this.checkDoc
	});

	// 코드블럭 추가
	this.item.querySelector('.d-btn-code').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<pre data-lang="text"><code></code></pre>');
		this.checkDoc
	});

	// 테이블 추가
	this.item.querySelector('.d-btn-table').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<table><thead><tr><th></th></tr></thead><tbody><tr><td></td></tr></tbody></table>');
		this.checkDoc
	});

	// 폰트크기 설정
	this.item.querySelector('.d-btn-size').addEventListener('change', () => {
		var val = this.item.querySelector('.d-btn-size').value;
		var el = sel.focusNode.parentNode;
		if (sel.baseOffset == sel.focusOffset) {
			if (el.className !== 'd-editor-doc') {
				el.classList.remove('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
				this.focus();
				if (val !== 'default') {
					el.classList.add(val);
					this.focus();
				} else {
					if (el.constructor == HTMLSpanElement) {
						el.parentNode.innerHTML = el.parentNode.textContent;
						this.focus();
					}
				}
			}
		} else if (sel.baseOffset > sel.focusOffset) {
			el.innerHTML = el.textContent.substring(0, sel.focusOffset) + '<span class="' + val + '">' + el.textContent.substring(sel.focusOffset, sel.baseOffset) + '</span>' + el.textContent.substring(sel.baseOffset, el.textContent.length);
			this.focus();
		} else if (sel.baseOffset < sel.focusOffset) {
			el.innerHTML = el.textContent.substring(0, sel.baseOffset) + '<span class="' + val + '">' + el.textContent.substring(sel.baseOffset, sel.focusOffset) + '</span>' + el.textContent.substring(sel.focusOffset, el.textContent.length);
			this.focus();
		}
	});

	// 폰트색상 설정
	this.item.querySelector('.d-btn-color').addEventListener('change', () => {
		var val = this.item.querySelector('.d-btn-color').value;
		var el = sel.focusNode.parentNode;
		if (sel.baseOffset == sel.focusOffset) {
			if (el.className !== 'd-editor-doc') {
				var elClass = el.classList;
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if(elClass[i].match(/d-color-[^]*/i)){
						el.classList.remove(elClass[i].match(/d-color-[^]*/i));
					}
				}
				this.focus();
				if (val !== 'default') {
					el.classList.add(val);
					this.focus();
				} else {
					if (el.constructor == HTMLSpanElement) {
						el.parentNode.innerHTML = el.parentNode.textContent;
						this.focus();
					}
				}
			}
		} else if (sel.baseOffset > sel.focusOffset) {
			el.innerHTML = el.textContent.substring(0, sel.focusOffset) + '<span class="' + val + '">' + el.textContent.substring(sel.focusOffset, sel.baseOffset) + '</span>' + el.textContent.substring(sel.baseOffset, el.textContent.length);
			this.focus();
		} else if (sel.baseOffset < sel.focusOffset) {
			el.innerHTML = el.textContent.substring(0, sel.baseOffset) + '<span class="' + val + '">' + el.textContent.substring(sel.baseOffset, sel.focusOffset) + '</span>' + el.textContent.substring(sel.focusOffset, el.textContent.length);
			this.focus();
		}
	});

	// bg색상 설정
	this.item.querySelector('.d-btn-bg').addEventListener('change', () => {
		var val = this.item.querySelector('.d-btn-bg').value;
		var el = sel.focusNode.parentNode;
		if (sel.baseOffset == sel.focusOffset) {
			if (el.className !== 'd-editor-doc') {
				var elClass = el.classList;
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if(elClass[i].match(/d-bg-[^]*/i)){
						el.classList.remove(elClass[i].match(/d-bg-[^]*/i));
					}
				}
				this.focus();
				if (val !== 'none') {
					el.classList.add(val);
					this.focus();
				} else {
					if (el.constructor == HTMLSpanElement) {
						el.parentNode.innerHTML = el.parentNode.textContent;
						this.focus();
					}
				}
			}
		} else if (sel.baseOffset > sel.focusOffset) {
			el.innerHTML = el.textContent.substring(0, sel.focusOffset) + '<span class="' + val + '">' + el.textContent.substring(sel.focusOffset, sel.baseOffset) + '</span>' + el.textContent.substring(sel.baseOffset, el.textContent.length);
			this.focus();
		} else if (sel.baseOffset < sel.focusOffset) {
			el.innerHTML = el.textContent.substring(0, sel.baseOffset) + '<span class="' + val + '">' + el.textContent.substring(sel.baseOffset, sel.focusOffset) + '</span>' + el.textContent.substring(sel.focusOffset, el.textContent.length);
			this.focus();
		}
	});

	this.doc.addEventListener('click', () => {
		this.checkDoc();
	});

	this.doc.addEventListener('keypress', () => {
		this.checkDoc();
	});

	var keydownTimer;
	this.item.querySelector('#d-editor-doc-wrap').addEventListener('keypress', (e) => {
		var key = e.key;
		var elNode = sel.focusNode.parentNode.parentNode;
		if (key == 'Tab') {
			e.preventDefault();
			document.execCommand('insertText', true, '    ');
		} else if (key == 'Enter' && e.shiftKey == false) { // pre 엔터 방지
			if (elNode.constructor == HTMLPreElement) {
				e.preventDefault();
				document.execCommand('insertHTML', true, '<p></p>');
			}
		}
		this.checkDoc();

		clearTimeout(keydownTimer);
		keydownTimer = setTimeout(() => {
			//기본구조 유지 스크립트.
			var html = this.item.querySelector('#d-editor-doc-wrap').innerHTML;
			if (html == '' || html == '<div class="d-editor-doc"></div>') {
				this.item.querySelector('#d-editor-doc-wrap').innerHTML = '<div class="d-editor-doc"><p></p></div>';
				this.focus();
			} else {
				var el = sel.focusNode;

				if (el.constructor == HTMLDivElement || el.parentNode.constructor == HTMLDivElement) {
					document.execCommand('formatBlock', true, 'p');
				}
			}
		}, 250);
	});
}