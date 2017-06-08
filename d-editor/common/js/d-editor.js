function dEditor(continer) {
	const tagREG = /[<>]/g;
	let item = continer ? document.querySelector(continer) : document.getElementById('d-editor');
	if (item == null) {
		console.warn('Please select existing element or make "#d_editor" element. [d-editor]');
		return false;
	}

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
	html += '<label class="d-btn d-btn-link" title="link" data-tag="paragraph,ul,table,link">link <input type="text"><button class="d-add">Add</button><button class="d-del">delete</button></label>';
	html += '<label class="d-btn d-btn-table-type" title="table-type" data-tag="table"><span class="title">table type</span><button class="d-th">th</button><button class="d-td">td</button></label>';
	html += '<label class="d-btn d-btn-col" title="col" data-tag="table">col <input type="number" value="1" min="1" max="10"></label>';
	html += '<label class="d-btn d-btn-row" title="row" data-tag="table">row <input type="number" value="1" min="1"></label>';
	html += '<label class="d-btn d-btn-lang" title="Language" data-tag="pre">Language';
	html += '<select>';
	html += '<option value="text">text</option>';
	html += '<option value="html">html</option>';
	html += '<option value="css">css</option>';
	html += '<option value="javascript">javascript</option>';
	html += '<option value="xml">json</option>';
	html += '<option value="php">php</option>';
	html += '<option value="java">java</option>';
	html += '</select>';
	html += '</label>';
	html += '</div>';

	html += '<div class="d-editor-document">';
	html += '<textarea name="d-editor-doc-val" id="d-editor-doc-val" hidden></textarea>';
	html += '<div id="d-editor-doc-wrap" contenteditable="true"><div class="d-editor-doc"><p></p></div></div>';
	//html += '<iframe src="./d-editor/textarea.html" id="d-editor-doc-wrap"></iframe>';
	html += '</div>';
	html += '<div class="d-pop">';
	html += '<div class="d-pop-help">';
	html += '<p class="d-pop-title">작성법</p>';
	html += '<p>리스트를 추가한후에 엔터를 두번치면 다음 리스트로 넘어가지 않습니다.</p>';
	html += '<p>코드블럭및 테이블 안에서는 Shift + Enter 으로 줄바꿈을 해야합니다.</p>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	this.item.innerHTML = html;

	// selector
	//this.window = this.item.querySelector('#d-editor-doc-wrap').contentWindow;
	//this.document = this.item.querySelector('#d-editor-doc-wrap').contentDocument;
	this.doc = this.item.querySelector('.d-editor-doc');
	let sel = window.getSelection();
	let range = document.createRange();

	/* function */
	// add contall button
	this.addBTN = function (element) {
		var reg = element.match(tagREG).length;
		if (reg % 2 == 0) {
			this.item.querySelector('.d-editor-controll01 .d-btn:first-of-type').insertAdjacentHTML('beforebegin', element);
		} else {
			console.warn('Please using HTMLString');
		}
	}

	// add attr option
	this.addAttr = function (element) {
		var reg = element.match(tagREG).length;
		if (reg % 2 == 0) {
			this.item.querySelector('.d-editor-controll02 *:first-child').insertAdjacentHTML('beforebegin', element);
		} else {
			console.warn('Please using HTMLString');
		}
	}

	// add text
	this.addText = function (string) {
		var reg = string.match(tagREG);
		if (reg == null || reg.length % 2 == 0) {
			this.doc.innerHTML += '<p>' + string + '</p>';
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
		var html = '<option value="none">none</option>';
		options.forEach((e) => {
			html += '<option value="' + e.class + '">' + e.name + '</option>';
		});
		this.item.querySelector('.d-btn-bg').innerHTML = html;
	}

	// eidte node option
	this.checkDoc = function () {
		var el = sel.focusNode.parentElement;
		if (el.className !== 'd-editor-doc') {
			var attr = this.item.querySelectorAll('.d-editor-controll02 label');
			[].forEach.call(attr, (e) => { e.classList.remove('act'); });
			var val = el.constructor;
			if (val == HTMLElement) {
				val = el.parentNode.constructor;
			}

			switch (val) {
				case HTMLParagraphElement:
					val = /paragraph/i;
					break;
				case HTMLAnchorElement:
					val = /link/i;
					var link = el.getAttribute('href');
					this.item.querySelector('.d-btn-link input').value = link;
					break;
				case HTMLUListElement:
					val = /ul/i;
					break;
				case HTMLOListElement:
					val = /ul/i;
					break;
				case HTMLLIElement:
					val = /ul/i;
					break;
				case HTMLPreElement:
					val = /pre/i;
					var lang = el.getAttribute('data-lang');
					if (el.constructor == HTMLElement) {
						lang = el.parentNode.getAttribute('data-lang');
					}
					this.item.querySelector('.d-btn-lang select').value = lang;
					break;
				case HTMLTableElement:
					val = /table/i;
					break;
				case HTMLTableColElement:
					val = /table/i;
					break;
				case HTMLTableRowElement:
					val = /table/i;
					break;
				case HTMLTableCellElement:
					val = /table/i;
					break;
				case HTMLDivElement:
					val = /paragraph/i;
					break;
				case HTMLImageElement:
					val = /img/i;
					break;
				default:
					val = /^/i;
					break;
			}

			[].forEach.call(attr, (e) => {
				if (val.test(e.getAttribute('data-tag'))) {
					e.classList.add('act');
				}
			});
		}
	}

	// focus
	this.focus = function () {
		document.getElementById('d-editor-doc-wrap').focus();
	}

	// submit
	this.submit = function () {
		var text = this.item.getElementById('d-editor-doc-wrap').innerHTML;
		this.item.getElementById('d-editor-doc-val').value = text;
	}

	/* extion */
	// help
	this.item.querySelector('.d-btn-help').addEventListener('click', () => {
		this.item.querySelector('.d-pop').classList.add('act');
	});
	this.item.querySelector('.d-pop').addEventListener('click', () => {
		this.item.querySelector('.d-pop').classList.remove('act');
	});

	// bold
	this.item.querySelector('.d-btn-b').addEventListener('click', () => {
		this.document.execCommand('bold', true, null);
	});

	// italic
	this.item.querySelector('.d-btn-i').addEventListener('click', () => {
		document.execCommand('italic', true, null);
	});

	// underline
	this.item.querySelector('.d-btn-u').addEventListener('click', () => {
		document.execCommand('underline', true, null);
	});

	// align-left
	this.item.querySelector('.d-btn-align-left').addEventListener('click', () => {
		var el = sel.focusNode.parentNode;
		if (el.className !== 'd-editor-doc') {
			el.classList.remove('text-align-center', 'text-align-right');
			el.classList.add('text-align-left');
		}
	});

	// align_center
	this.item.querySelector('.d-btn-align-center').addEventListener('click', () => {
		var el = sel.focusNode.parentNode;
		if (el.className !== 'd-editor-doc') {
			el.classList.remove('text-align-right', 'text-align-left');
			el.classList.add('text-align-center');
		}
	});

	// align-right
	this.item.querySelector('.d-btn-align-right').addEventListener('click', () => {
		var el = sel.focusNode.parentNode;
		if (el.className !== 'd-editor-doc') {
			el.classList.remove('text-align-center', 'text-align-left');
			el.classList.add('text-align-right');
		}
	});

	// add link
	this.item.querySelector('.d-btn-link .d-add').addEventListener('click', () => {
		var link = this.item.querySelector('.d-btn-link input').value;
		document.execCommand('createLink', true, link);
		this.checkDoc();
		this.focus();
	});

	// unlink
	this.item.querySelector('.d-btn-link .d-del').addEventListener('click', () => {
		document.execCommand('unlink', true, null);
		this.checkDoc();
		this.focus();
	});

	// 순서없는 리스트 추가
	this.item.querySelector('.d-btn-list01').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<ul><li></li></ul>');
		this.checkDoc();
		this.focus();
	});

	// 순서있는 리스트 추가
	this.item.querySelector('.d-btn-list02').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<ol><li></li></ol>');
		this.checkDoc();
		this.focus();
	});

	// code block
	this.item.querySelector('.d-btn-code').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<pre data-lang="text"><code></code></pre>');
		this.checkDoc();
		this.focus();
	});

	// table
	this.item.querySelector('.d-btn-table').addEventListener('click', () => {
		document.execCommand('insertHTML', true, '<table><thead><tr><th></th></tr></thead><tbody><tr><td></td></tr></tbody></table>');
		this.checkDoc();
		this.focus();
	});

	// table type th
	this.item.querySelector('.d-btn-table-type .d-th').addEventListener('click', () => {
		var el = sel.focusNode;
		console.log(el);
		if(sel.focusNode.constructor == Text){
			el = sel.focusNode.parentNode;
		}
		var val = el.textContent;
		el.insertAdjacentHTML('afterend', '<th>'+ val +'</th>');
		el.remove();
		this.checkDoc();
		this.focus();
	});

	// font-size
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

	// font-color
	this.item.querySelector('.d-btn-color').addEventListener('change', () => {
		var val = this.item.querySelector('.d-btn-color').value;
		var el = sel.focusNode.parentNode;
		if (sel.baseOffset == sel.focusOffset) {
			if (el.className !== 'd-editor-doc') {
				var elClass = el.classList;
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if (elClass[i].match(/d-color-[^]*/i)) {
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

	// background
	this.item.querySelector('.d-btn-bg').addEventListener('change', () => {
		var val = this.item.querySelector('.d-btn-bg').value;
		var el = sel.focusNode.parentNode;
		if (sel.baseOffset == sel.focusOffset) {
			if (el.className !== 'd-editor-doc') {
				var elClass = el.classList;
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if (elClass[i].match(/d-bg-[^]*/i)) {
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
	this.item.querySelector('#d-editor-doc-wrap').addEventListener('keydown', (e) => {
		var key = e.key;
		var elNode = sel.focusNode.parentNode.parentNode;
		if (key == 'Tab') {
			e.preventDefault();
			document.execCommand('insertText', true, '    ');
		} else if (key == 'Enter' && e.shiftKey == false) {
			if (elNode.constructor == HTMLPreElement) { // pre 엔터 방지
				e.preventDefault();
				document.execCommand('insertHTML', true, '<p></p>');
			} else if (sel.focusNode.parentNode.constructor == HTMLTableRowElement || sel.focusNode.parentNode.constructor == HTMLTableCellElement || sel.focusNode.parentNode.constructor == HTMLTableColElement) {
				e.preventDefault();
				if (sel.focusNode.constructor == Text) {
					var table = sel.focusNode.parentNode.parentNode.parentNode.parentNode;
				} else {
					var table = sel.focusNode.parentNode.parentNode.parentNode;
				}

				if (table.nextSibling == null) {
					table.insertAdjacentHTML('afterend', '<p>&nbsp;</p>');
					range.setStart(this.doc.childNodes[this.doc.childNodes.length - 1], 1);
				} else {
					range.setStart(table.nextSibling, 0);
				}
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
				this.focus();
			}
		}
		this.checkDoc();

		clearTimeout(keydownTimer);
		keydownTimer = setTimeout(() => {
			// default tree maintain
			var html = this.item.querySelector('#d-editor-doc-wrap').innerHTML;
			if (html == '' || html == '<div class="d-editor-doc"></div>') {
				this.item.querySelector('#d-editor-doc-wrap').innerHTML = '<div class="d-editor-doc"><p></p></div>';
				this.focus();
			} else {
				var el = sel.focusNode;

				if (el.constructor == HTMLDivElement || el.parentNode.constructor == HTMLDivElement) {
					document.execCommand('formatBlock', true, 'p');
					this.focus();
				}
			}
		}, 250);
	});
}