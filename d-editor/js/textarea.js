window.onload = () => {
	let sel = window.getSelection();
	let range = document.createRange();
	let doc = document.body;

	window.addText = function(string){
		doc.innerHTML += '<p>'+ string +'</p>';
	}

	window.docValue = function(){
		return doc.innerHTML;
	}

	window.bold = function(){
		document.execCommand('bold', true, null);
		doc.focus();
	}

	window.italic = function(){
		document.execCommand('italic', true, null);
		doc.focus();
	}

	window.underline = function(){
		document.execCommand('underline', true, null);
		doc.focus();
	}

	window.alignText = function(type){
		var el = sel.focusNode;
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}
		el.classList.remove('text-align-left','text-align-center','text-align-right');
		el.classList.add(type);
		doc.focus();
	}

	window.addList = function(type){
		var html = '<ul><li></li></ul>';
		if(type == 'ol'){
			html = '<ol type="1"><li></li></ol>';
		}
		var el = sel.focusNode;
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}

		if(el.constructor == HTMLParagraphElement){
			document.execCommand('insertHTML', true, html);
		}else if(el.constructor !== HTMLLIElement){
			doc.innerHTML += html;
			range.setStart(doc.childNodes[doc.childNodes.length - 1], 1);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}else{
			el.innerHTML += html;
			range.setStart(el.childNodes[1], 1);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	window.codeBlock = function(){
		var el = sel.focusNode;
		var html = '<pre data-lang="text"><code></code></pre>';
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}
		if(el.constructor == HTMLElement){
			el = el.parentNode;
		}

		if(el.constructor == HTMLParagraphElement){
			document.execCommand('insertHTML', true, html);
		}else if(el.constructor == HTMLPreElement){
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[0] , 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}else{
			doc.innerHTML += html;
			range.setStart(doc.childNodes[doc.childNodes.length - 1].childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	window.addTable = function(){
		var el = sel.focusNode;
		var html = '<table><colgroup><col width="100%"></colgroup><tbody><tr><td></td></tr><tr><td></td></tr></tbody></table>';
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}
		if(el.constructor == HTMLElement){
			el = el.parentNode;
		}

		if(el.constructor == HTMLParagraphElement){
			document.execCommand('insertHTML', true, html);
		}else if(el.constructor == HTMLPreElement){
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[1] , 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}else{
			doc.innerHTML += html;
			range.setStart(doc.childNodes[doc.childNodes.length - 1].childNodes[1], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	window.fontSize = function(val){
		var el = sel.focusNode;
		var focus = sel.focusOffset;
		var base = sel.baseOffset;
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}

		if (el.className !== 'd-editor-doc'){
			var elClass = el.classList;

			if(val !== 'default'){
				if(base == focus){
					el.classList.add(val);
				}else if(base < focus){
					el.innerHTML = el.innerHTML.substring(0, base) + '<span class="' + val + '">' + el.innerHTML.substring(base, focus) + '</span>' + el.innerHTML.substring(focus, el.innerHTML.length);
				}else if(base > focus){
					el.innerHTML = el.innerHTML.substring(0, focus) + '<span class="' + val + '">' + el.innerHTML.substring(focus, base) + '</span>' + el.innerHTML.substring(base, el.innerHTML.length);
				}
			}else{
				el.classList.remove('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
			}
			doc.focus();
		}
	}

	window.elementColor = function(val,type){
		var el = sel.focusNode;
		var focus = sel.focusOffset;
		var base = sel.baseOffset;
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}

		if (el.className !== 'd-editor-doc'){
			var elClass = el.classList;
			if(type == 'color'){
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if (elClass[i].match(/d-color-[^]*/i)) {
						el.classList.remove(elClass[i].match(/d-color-[^]*/i));
					}
				}
			}else if(type == 'bg'){
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if (elClass[i].match(/d-bg-[^]*/i)) {
						el.classList.remove(elClass[i].match(/d-bg-[^]*/i));
					}
				}
			}

			if(val !== 'default'){
				if(base == focus){
					el.classList.add(val);
				}else if(base < focus){
					el.innerHTML = el.innerHTML.substring(0, base) + '<span class="' + val + '">' + el.innerHTML.substring(base, focus) + '</span>' + el.innerHTML.substring(focus, el.innerHTML.length);
				}else if(base > focus){
					el.innerHTML = el.innerHTML.substring(0, focus) + '<span class="' + val + '">' + el.innerHTML.substring(focus, base) + '</span>' + el.innerHTML.substring(base, el.innerHTML.length);
				}
			}
			doc.focus();
		}
	}

	window.addLink = function(val){
		document.execCommand('createLink', true, val);
	}

	window.delLink = function(){
		document.execCommand('unLink', true, null);
	}

	window.reWriteTable = function(row,col){
		var el = sel.focusNode;
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}
		var table = el.parentNode.parentNode.parentNode;
		var html = '<colgroup>';
		for(var i = 0;i < col;i += 1){
			html += '<col width="'+ 100/col +'%">';
		}
		html += '</colgroup>';
		html += '<tbody>';
		for(var j = 0;j < row;j += 1){
			html += '<tr>';
			for(var k = 0;k < col;k += 1){
				html += '<td></td>';
			}
			html += '</tr>';
		}
		html += '</tbody>';
		table.innerHTML = html;
	}

	window.tabelType = function(type){
		var el = sel.focusNode;
		if(sel.focusNode.constructor == Text){
			el = sel.focusNode.parentNode;
		}

		var val = el.textContent;
		if(type == 'td'){
			el.insertAdjacentHTML('afterend', '<td>'+ val +'</td>');
		}else if(type == 'th'){
			el.insertAdjacentHTML('afterend', '<th>'+ val +'</th>');
		}
		range.setStart(el.nextSibling, 0);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		el.remove();
	}

	window.checkDoc = function(event){
		var el = sel.focusNode;
		if(el.constructor == Text){
			el = sel.focusNode.parentNode;
		}
		if(el.constructor == HTMLElement){
			el = el.parentNode;
		}

		var val = el.constructor;
		var attrs = top.document.querySelectorAll('.d-editor-area .d-editor-controll02 label');
		var link = top.document.querySelector('.d-editor-area .d-editor-controll02 .d-btn-link input');
		link.value = '';
		switch (val) {
			case HTMLParagraphElement:
				val = /paragraph/i;
				break;
			case HTMLAnchorElement:
				val = /link/i;
				link.value = el.getAttribute('href');
				break;
			case HTMLLIElement:
				val = /ul/i;
				break;
			case HTMLPreElement:
				val = /pre/i;
				break;
			case HTMLTableCellElement:
				val = /table/i;
				var table = el.parentNode.parentNode.parentNode;
				var row = table.querySelectorAll('tr').length;
				var col = table.querySelectorAll('tr:first-child td').length;
				top.document.querySelector('.d-editor-area .d-editor-controll02 .d-btn-row input').value = row;
				top.document.querySelector('.d-editor-area .d-editor-controll02 .d-btn-col input').value = col;
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

		[].forEach.call(attrs, (e) => {
			if (val.test(e.getAttribute('data-tag'))) {
				e.classList.add('act');
			}else{
				e.classList.remove('act');
			}
		});

		if(el.constructor == HTMLDivElement){
			document.execCommand('formatBlock', true, 'p');
		}

		if(event.constructor == KeyboardEvent){
			let key = event.key;
			if(el.constructor == HTMLBodyElement){
				document.execCommand('insertHTML', true, '<p></p>');
			}

			if(event.key == 'Tab'){
				event.preventDefault();
				document.execCommand('insertText', true, '    ');
			}else if(key == 'Enter' && event.shiftKey == false){
				if(el.constructor == HTMLElement){
					el = el.parentNode;
				}

				if(el.constructor == HTMLPreElement){
					event.preventDefault();
					document.execCommand('insertHTML', true, '<p></p>');
				}else if(el.constructor == HTMLTableCellElement){
					event.preventDefault();
					let table = el.parentNode.parentNode.parentNode;

					if (table.nextSibling == null || table.nextSibling.constructor == Text) {
						table.insertAdjacentHTML('afterend', '<p></p>');
					}
					range.setStart(table.nextSibling, 0);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		}
	}
}