window.onload = () => {
	let sel = this.getSelection(),
		range = document.createRange(),
		doc = document.body;

	this.getNode = function () {
		let el = sel.focusNode;

		if (el.constructor == Text) {
			el = el.parentNode;
		}
		if (el.constructor == HTMLElement) {
			el = el.parentNode;
		}

		return el;
	}

	this.addLink = function (val) {
		document.execCommand('createLink', true, val);
	}

	this.delLink = function () {
		document.execCommand('unLink', true, null);
	}

	this.bold = function () {
		document.execCommand('bold', true, null);
	}
	this.italic = function () {
		document.execCommand('italic', true, null);
	}

	this.underline = function () {
		document.execCommand('underline', true, null);
	}

	this.strikeOut = function () {
		let el = this.getNode(),
			focus = sel.focusOffset,
			base = sel.baseOffset;

		if(el.constructor == HTMLModElement){
			let text = el.textContent;
			el.insertAdjacentText('afterend',text);
			el.remove();
		}else{
			let html = el.innerHTML,
				check = html.search(sel.toString());
			if(check !== -1){
				el.innerHTML = html.replace(sel.toString(),'<del>$&</del>')
			}else{
				alert('드래그를 잘못하셧습니다.');
			}
		}
		doc.focus();

	}

	this.block = function () {
		let el = sel.focusNode.parentNode;

		if(el.constructor == HTMLElement){
			let text = el.textContent;
			el.insertAdjacentText('afterend',text);
			el.remove();
		}else{
			let html = el.innerHTML,
				check = html.search(sel.toString());
			if(check !== -1){
				el.innerHTML = html.replace(sel.toString(),'<code>$&</code>')
			}else{
				alert('드래그를 잘못하셧습니다.');
			}
		}
		doc.focus();

	}

	this.alignText = function (type) {
		let el = this.getNode();
		el.classList.remove('text-align-left', 'text-align-center', 'text-align-right');
		el.classList.add(type);
		doc.focus();
	}

	this.addList = function (type) {
		let html = '<ul><li></li></ul>',
			el = this.getNode();

		if (type == 'ol') {
			html = '<ol type="1"><li></li></ol>';
		}

		if (el.constructor == HTMLParagraphElement) {
			document.execCommand('insertHTML', true, html);
		} else if (el.constructor !== HTMLLIElement) {
			doc.innerHTML += html;
			range.setStart(doc.childNodes[doc.childNodes.length - 1], 1);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		} else {
			el.innerHTML += html;
			range.setStart(el.childNodes[1], 1);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	this.quote = function () {
		let el = this.getNode().parentNode,
			html = '<blockquote><p></p></blockquote>';

		if (el.constructor !== HTMLQuoteElement && el.constructor !== HTMLTableRowElement) {
			document.execCommand('insertHTML', true, html);
		} else if (el.constructor == HTMLTableRowElement) {
			let table = el.parentNode.parentNode;
			table.insertAdjacentHTML('afterend', html);
			range.setStart(table.nextSibling.childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		} else {
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	this.table = function () {
		let el = this.getNode(),
			html = '<table><colgroup><col class="width01"></colgroup><tbody><tr><td></td></tr><tr><td></td></tr></tbody></table>';

		if (el.constructor !== HTMLTableCellElement && el.parentNode.constructor !== HTMLQuoteElement) {
			document.execCommand('insertHTML', true, html);
		} else if (el.parentNode.constructor == HTMLQuoteElement) {
			el = el.parentNode;
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		} else {
			el = el.parentNode.parentNode.parentNode;
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	this.codeBlock = function () {
		let el = this.getNode(),
			html = '<pre data-theme="default"><code class="nohighlight"></code></pre>';

		if (el.constructor !== HTMLTableCellElement) {
			document.execCommand('insertHTML', true, html);
		} else {
			el = el.parentNode.parentNode.parentNode;
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	this.fontsSize = function (size) {
		let el = this.getNode();

		if (size == 'none') {
			el.classList.remove('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
		} else {
			el.classList.remove('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
			el.classList.add(size);
		}
		doc.focus();
	}

	this.elementColor = function (val, type) {
		let el = this.getNode(),
			elClass = el.classList,
			focus = sel.focusOffset,
			base = sel.baseOffset;

		if (type == 'color') {
			for (var i = 0, num = elClass.length; i < num; i += 1) {
				if (elClass[i].match(/d-color-.*/g)) {
					elClass.remove(elClass[i].match(/d-color-.*/g));
				}
			}
		} else if (type == 'bg') {
			for (var i = 0, num = elClass.length; i < num; i += 1) {
				if (elClass[i].match(/d-bg-.*/g)) {
					elClass.remove(elClass[i].match(/d-bg-.*/g));
				}
			}
		}

		if(el.constructor !== HTMLSpanElement){
			if (val !== 'none') {
				if (base == focus) {
					elClass.add(val);
				}else{
					let html = el.innerHTML,
						check = html.search(sel.toString());
					if(check !== -1){
						el.innerHTML = html.replace(sel.toString(),'<span class="'+ val +'">$&</span>')
					}else{
						alert('드래그를 잘못하셧습니다.');
					}
				}
			}
		}else{
			if (val !== 'none') {
				elClass.add(val);
			}else{
				let text = el.textContent;
				el.insertAdjacentText('afterend',text);
				el.remove();
			}
		}
		doc.focus();
	}

	this.olType = function (type) {
		let el = this.getNode();
		if (el.constructor == HTMLLIElement) {
			el = el.parentNode;
		}

	el.setAttribute('type', type);
		doc.focus();
	}

	this.tabelType = function (type) {
		let el = this.getNode(),
			val = el.textContent;
		if (type == 'td') {
			el.insertAdjacentHTML('afterend', '<td>' + val + '</td>');
		} else if (type == 'th') {
			el.insertAdjacentHTML('afterend', '<th>' + val + '</th>');
		}
		range.setStart(el.nextSibling, 0);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		el.remove();
	}

	this.reWriteTable = function (row, col) {
		let el = this.getNode().parentNode.parentNode.parentNode,
			html = '<colgroup>';

		for (var i = 0; i < col; i += 1) {
			html += '<col class="width'+ col +'">';
		}
		html += '</colgroup>';

		html += '<tbody>';
		for (var j = 0; j < row; j += 1) {
			html += '<tr>';
			for (var k = 0; k < col; k += 1) {
				html += '<td></td>';
			}
			html += '</tr>';
		}
		html += '</tbody>';
		el.innerHTML = html;
	}

	this.preTheme = function (theme) {
		let el = this.getNode();
		el = findNode(el);
		if (el.constructor == HTMLElement) {
			el = el.parentNode;
		}

		el.setAttribute('data-theme', theme);
	}

	this.preLang = function (lang) {
		let el = this.getNode();
		el = findNode(el);
		if (el.constructor == HTMLElement) {
			el = el.parentNode;
		}
		el = el.childNodes[0];

		el.classList.value = '';
		el.classList.add(lang);
		el.innerHTML = el.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#47;');
		hljs.highlightBlock(el);
	}

	this.addImg = function (src, w, h, name) {
		let el = this.getNode(),
			html = '<p><img src="' + src + '" alt="' + name + '" width="' + w + '" height="' + h + '" layout="responsive"></p>';

		if (el.constructor == HTMLParagraphElement) {
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling, 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		} else {
			doc.innerHTML += html;
		}
		this.checkDoc();
		doc.focus();
	}

	this.imgSize = function (val) {
		let el = this.getNode();
		el.classList.remove('img25', 'img50', 'img75');
		if (val !== 'none') {
			el.classList.add('img' + val);
		}
		doc.focus();
	}

	this.imgMaxSize = function (val) {
		let el = this.getNode();
		el.classList.remove('img_max1200', 'img_max600', 'img_max300');
		if (val !== 'none') {
			el.classList.add('img_max' + val);
		}
		doc.focus();
	}

	this.addVideo = function (link) {
		let el = this.getNode(),
			html = '<div class="d-video"><iframe src="'+ link +'"></iframe></div>';

		if (el.constructor == HTMLParagraphElement) {
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling, 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		} else {
			doc.innerHTML += html;
		}
		this.checkDoc();
		doc.focus();

}

	this.docValue = function () {
		return doc.innerHTML.replace(/<img/g, '<amp-img')
			.replace(/layout="responsive">/g, 'layout="responsive"></amp-img>')
			.replace(/<iframe src/g, '<amp-iframe width="560" height="315" sandbox="allow-scripts allow-same-origin allow-presentation" layout="responsive" frameborder="0" src')
			.replace(/<\/iframe>/g, '<amp-img placeholder layout="fill" src="/common/img/dico.png"></amp-img></amp-iframe>');
	}

	this.doc = function (val) {
		doc.innerHTML = val.replace(/"><\/<span/g, '">&lt;&#47;<span')
			.replace(/span>><\/span/g, 'span>&gt;</span')
			.replace(/\<(?= )/g, '&lt;')
			.replace(/<amp-img/g, '<img')
			.replace(/<\/amp-img>/g, '')
			.replace(/<amp-iframe width="560" height="315" sandbox="allow-scripts allow-same-origin allow-presentation" layout="responsive" frameborder="0" src/g, '<iframe src')
			.replace(/<amp-img placeholder layout="fill" src="\/common\/img\/dico.png"><\/amp-img><\/amp-iframe>/g, '</iframe>');
	}

	this.submit = function () {
		let img = doc.querySelectorAll('img');

		img.forEach(function (item) {
			let name = item.getAttribute('alt');
			item.src = '/common/img/post/' + name;
		});

		return this.docValue();
	}

	function findNode(el) {
		if (el.constructor !== HTMLSpanElement) {
			return el;
		} else {
			return findNode(el.parentNode);
		}
	}

	this.checkDoc = function (event) {
		let el = this.getNode();
		el = findNode(el);

		if (el.constructor == HTMLLIElement || el.constructor == HTMLElement) {
			el = el.parentNode;
		}
		let pel = el.parentNode,
			val = el.constructor,
			tag = RegExp('.*', 'g');
			elClass = el.classList,
			attrs = top.document.querySelectorAll('.side_menu02 .field'),
			link = top.document.querySelector('.side_menu02 .op_link input'),
			fontSize = top.document.querySelector('.side_menu .op_font_size'),
			color = top.document.querySelector('.side_menu .op_color'),
			bg = top.document.querySelector('.side_menu .op_bg');

		link.value = '';
		fontSize.value = 'none';
		color.value = 'none';
		bg.value = 'none';

		for (var i = 0, num = elClass.length; i < num; i += 1) {
			if (elClass[i].match(/.\d/g)) {
				fontSize.value = elClass[i].match(/.\d/g);
			} else if (elClass[i].match(/d-color-.*/g)) {
				color.value = elClass[i].match(/d-color-.*/g);
			} else if (elClass[i].match(/d-bg-.*/g)) {
				bg.value = elClass[i].match(/d-bg-.*/g);
			}
		}

		switch (val) {
			case HTMLParagraphElement:
				tag = RegExp('paragraph', 'g');
				if (el.querySelectorAll('img').length > 0) {
					tag = RegExp('img', 'g');
					let img_class = el.classList,
						pc = RegExp('img_max\d*','g'),
						m = RegExp('img\d*','g');

					if(img_class.length > 0){
						img_class.forEach(function(item){
							if(pc.test(item)){
								top.document.querySelector('.side_menu .op_width_pc').value = item.replace('img_max', '');
							}/*else if(m.test(item)){
								top.document.querySelector('.side_menu .op_width').value = item.replace('img', '');
							}*/
						});
					}else{
						top.document.querySelector('.side_menu .op_width_pc').value = 'none';
					}

				}
				break;
			case HTMLUListElement:
				tag = RegExp('ul', 'g');
				break;
			case HTMLOListElement:
				tag = RegExp('ol', 'g');
				top.document.querySelector('.side_menu .op_ol_type select').value = el.getAttribute('type');
				break;
			case HTMLAnchorElement:
				tag = RegExp('link', 'g');
				link.value = el.getAttribute('href');
				break;
			case HTMLPreElement:
				tag = RegExp('pre', 'g');
				let theme = el.getAttribute('data-theme'),
					lang = el.childNodes[0].classList[0];
				top.document.querySelector('.side_menu02 .op_pre_theme').value = theme;
				top.document.querySelector('.side_menu02 .op_pre_lang').value = lang;
				break;
			case HTMLTableCellElement:
				tag = RegExp('table', 'g');
				let table = this.getNode().parentNode.parentNode.parentNode,
					row = table.querySelectorAll('tr').length,
					col = table.querySelectorAll('tr:first-child td').length;

				top.document.querySelector('.side_menu .op_table .op_row').value = row;
				top.document.querySelector('.side_menu .op_table .op_col').value = col;
				break;
			case HTMLDivElement:
				tag = RegExp('paragraph', 'g');
				break;
			default:
				tag = RegExp('.*', 'g');
				break;
		}

		attrs.forEach(function (field) {
			if (field.getAttribute('data-tag').search(tag) !== -1) {
				field.classList.add('act');
			} else {
				field.classList.remove('act');
			}
		});

		if (event.constructor == KeyboardEvent) {
			let key = event.key;

			doc.querySelectorAll('p').forEach(function (p) {
				let text = p.textContent,
					img = p.querySelector('img');
				if(text == '' || img == 'undefined'){
					p.innerHTML = '';
				}
			});

			if (el.constructor == HTMLBodyElement) {
				document.execCommand('insertHTML', true, '<p></p>');
			}

			if (event.key == 'Tab') {
				event.preventDefault();
				document.execCommand('insertText', true, '    ');
			} else if (key == 'Enter' && event.shiftKey == false) {
				if(el.constructor == HTMLDivElement){
					event.preventDefault();
					if (el.nextSibling == null || el.nextSibling.constructor == Text) {
						el.insertAdjacentHTML('afterend', '<p></p>');
					}
					range.setStart(el.nextSibling, 0);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}else if (el.constructor == HTMLPreElement) {
					event.preventDefault();
					if (el.nextSibling == null || el.nextSibling.constructor == Text) {
						el.insertAdjacentHTML('afterend', '<p></p>');
					}
					range.setStart(el.nextSibling, 0);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (el.constructor == HTMLTableCellElement) {
					event.preventDefault();
					let table = el.parentNode.parentNode.parentNode;
					if (table.nextSibling == null || table.nextSibling.constructor == Text) {
						table.insertAdjacentHTML('afterend', '<p></p>');
					}
					range.setStart(table.nextSibling, 0);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (el.constructor == HTMLUListElement || el.constructor == HTMLOListElement) {
					let child = this.getNode();
					if (child.textContent == '') {
						event.preventDefault();
						if (pel.constructor == HTMLLIElement) {
							pel.insertAdjacentHTML('afterend', '<li></li>');
							range.setStart(pel.nextSibling, 0);
						} else {
							el.insertAdjacentHTML('afterend', '<p></p>');
							range.setStart(el.nextSibling, 0);
						}
						range.collapse(true);
						sel.removeAllRanges();
						sel.addRange(range);
						child.remove();
					}
				}

				if (pel.constructor == HTMLQuoteElement) {
					if (el.childNodes.length == 0) {
						event.preventDefault();
						el.remove();
						pel.insertAdjacentHTML('afterend', '<p></p>');
						range.setStart(pel.nextSibling, 0);
						range.collapse(true);
						sel.removeAllRanges();
						sel.addRange(range);
					}
				}
			}

			document.querySelector('.d-editor-doc').childNodes.forEach(function (child) {
				if (child.constructor == Text) {
					let text = child.textContent;
					child.nextElementSibling.insertAdjacentHTML('beforeend', '<p>' + text + '</p>');
					child.remove();
				} else if (child.constructor == HTMLDivElement) {
					if(child.classList.length == 0){
						let html = child.innerHTML;
						child.remove();
						doc.innerHTML += '<div class="notice ts" style="position:fixed;top:20px;left:50%;width:250px;padding:5px 0;margin-left:-125px;background:#fff;text-align:center;border:2px solid #38b7ea;border-radius:5px">잘못된 붙여넣기를 삭제했습니다.</div>';
						setTimeout(function () {
							doc.querySelector('div.notice').remove();
						}, 1000);
					}
				}
			});
		}
	}

	document.addEventListener('click', function (e) {
		window.checkDoc(e);
	});


	document.addEventListener('keydown', function (e) {
		window.checkDoc(e);
	});
}