window.onload = () => {
	let sel = window.getSelection();
	let range = document.createRange();
	let doc = document.body;

	window.addText = function (string) {
		doc.innerHTML += '<p>' + string + '</p>';
	}

	window.docValue = function () {
		return doc.innerHTML;
	}

	window.unValue = function (val) {
		doc.innerHTML = val;
	}

	window.bold = function () {
		document.execCommand('bold', true, null);
	}

	window.italic = function () {
		document.execCommand('italic', true, null);
	}

	window.underline = function () {
		document.execCommand('underline', true, null);
	}

	window.alignText = function (type) {
		var el = sel.focusNode;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}
		el.classList.remove('text-align-left', 'text-align-center', 'text-align-right');
		el.classList.add(type);
		doc.focus();
	}

	window.addList = function (type) {
		var html = '<ul><li></li></ul>';
		if (type == 'ol') {
			html = '<ol type="1"><li></li></ol>';
		}
		var el = sel.focusNode;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
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

	window.codeBlock = function () {
		var el = sel.focusNode;
		var html = '<pre data-lang="text"><code></code></pre>';
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}
		if (el.constructor == HTMLElement) {
			el = el.parentNode;
		}

		if (el.constructor == HTMLParagraphElement) {
			document.execCommand('insertHTML', true, html);
		} else if (el.constructor == HTMLPreElement) {
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		} else {
			doc.innerHTML += html;
			range.setStart(doc.childNodes[doc.childNodes.length - 1].childNodes[0], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	window.addTable = function () {
		var el = sel.focusNode;
		var html = '<table><colgroup><col width="100%"></colgroup><tbody><tr><td></td></tr><tr><td></td></tr></tbody></table>';
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}
		if (el.constructor == HTMLElement) {
			el = el.parentNode;
		}

		if (el.constructor == HTMLParagraphElement) {
			document.execCommand('insertHTML', true, html);
		} else if (el.constructor == HTMLPreElement) {
			el.insertAdjacentHTML('afterend', html);
			range.setStart(el.nextSibling.childNodes[1], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		} else {
			doc.innerHTML += html;
			range.setStart(doc.childNodes[doc.childNodes.length - 1].childNodes[1], 0);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	window.fontSize = function (val) {
		var el = sel.focusNode;
		var focus = sel.focusOffset;
		var base = sel.baseOffset;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}

		if (el.className !== 'd-editor-doc') {
			var elClass = el.classList;

			if (val !== 'default') {
				if (base == focus) {
					el.classList.add(val);
				} else if (base < focus) {
					el.innerHTML = el.innerHTML.substring(0, base) + '<span class="' + val + '">' + el.innerHTML.substring(base, focus) + '</span>' + el.innerHTML.substring(focus, el.innerHTML.length);
				} else if (base > focus) {
					el.innerHTML = el.innerHTML.substring(0, focus) + '<span class="' + val + '">' + el.innerHTML.substring(focus, base) + '</span>' + el.innerHTML.substring(base, el.innerHTML.length);
				}
			} else {
				el.classList.remove('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
			}
			doc.focus();
		}
	}

	window.elementColor = function (val, type) {
		var el = sel.focusNode;
		var focus = sel.focusOffset;
		var base = sel.baseOffset;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}

		if (el.className !== 'd-editor-doc') {
			var elClass = el.classList;
			if (type == 'color') {
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if (elClass[i].match(/d-color-[^]*/i)) {
						el.classList.remove(elClass[i].match(/d-color-[^]*/i));
					}
				}
			} else if (type == 'bg') {
				for (var i = 0, num = elClass.length; i < num; i += 1) {
					if (elClass[i].match(/d-bg-[^]*/i)) {
						el.classList.remove(elClass[i].match(/d-bg-[^]*/i));
					}
				}
			}

			if (val !== 'default') {
				if (base == focus) {
					el.classList.add(val);
				} else if (base < focus) {
					el.innerHTML = el.innerHTML.substring(0, base) + '<span class="' + val + '">' + el.innerHTML.substring(base, focus) + '</span>' + el.innerHTML.substring(focus, el.innerHTML.length);
				} else if (base > focus) {
					el.innerHTML = el.innerHTML.substring(0, focus) + '<span class="' + val + '">' + el.innerHTML.substring(focus, base) + '</span>' + el.innerHTML.substring(base, el.innerHTML.length);
				}
			}
			doc.focus();
		}
	}

	window.addLink = function (val) {
		document.execCommand('createLink', true, val);
	}

	window.delLink = function () {
		document.execCommand('unLink', true, null);
	}

	window.reWriteTable = function (row, col) {
		var el = sel.focusNode;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}
		var table = el.parentNode.parentNode.parentNode;
		var html = '<colgroup>';
		for (var i = 0; i < col; i += 1) {
			html += '<col width="' + 100 / col + '%">';
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
		table.innerHTML = html;
	}

	window.tabelType = function (type) {
		var el = sel.focusNode;
		if (sel.focusNode.constructor == Text) {
			el = sel.focusNode.parentNode;
		}

		var val = el.textContent;
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

	window.preLang = function (lang) {
		var el = sel.focusNode;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}
		if (el.constructor == HTMLElement) {
			el = el.parentNode;
		}

		el.setAttribute('data-lang', lang);
	}

	window.olType = function (type) {
		var el = sel.focusNode;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}
		if (el.constructor == HTMLLIElement) {
			el = el.parentNode;
		}

		el.setAttribute('type', type);
	}

	function preJs(node) {
		var html = '';
		var num = node.length;
		for (var i = 0; i < num; i += 1) {
			if (node[i] !== '') {
				html += node[i].replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/[[\]=()!+\-,1](?= |=|\)|;)|;|{|}|\(/g, '<span class="pre-white">$&</span>');
					//.replace(/\/.*\/(?=i|g|m)/g, '<span class="pre-orange">$&</span>')
					//.replace(/([^\\/])('[^',]*')/g, '$1<span class="pre-orange">$2</span>')
					//.replace(/(var|function|let|const|class|&#61;&gt;)(?= )/g, '<span class="pre-blue">$&</span>')
					//.replace(/(window|document)/g, '<span class="pre-sky">$&</span>')
					//.replace(/(if|return|for|forEach|switch|case|break|default)(?= |;|\()/g, '<span class="pre-purple">$&</span>');
			}
			html += '\n';
		}
		return html;
	}

	function preCss(node) {
		var html = '';
		var num = node.length;
		for (var i = 0; i < num; i += 1) {
			if (node[i] !== '') {
				html += node[i].replace(/\@(.*(?= |\{))/g, '<span class="pre-purple">$&</span>')
					.replace(/\#.*(?= \.)/g, '<span class="pre-id">$&</span>')
					.replace(/( )(\#.*)(?= \#)/g, '$1<span class="pre-id">$2</span>')
					.replace(/\#(?!\d)[^ ]*(?={)/g, '<span class="pre-id">$&</span>')
					.replace(/\.(?!eot|woff|ttf|svg|jpg|png|gif|\d)[^ {]*/g, '<span class="pre-class">$&</span>')
					.replace(/(\d*%|align-content|align-items|align-self|all|animation|appearance|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|bleed|border|border-collapse|border-image|border-radius|bottom|box-decoration-break|box-shadow|box-sizing|break-inside|caption-side|clear|clip-path|color|column-count|column-fill|column-gap|column-rule|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|fill|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-display|font-family|font-feature-settings|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|grid-row|grid-column|grid-row-span|grid-column-span|grid-rows|grid-columns|hanging-punctuation|height|hyphens|image-rendering|initial-letter|isolation|justify-content|left|letter-spacing|line-height|list-style|margin|max-height|max-width|min-height|min-width|mix-blend-mode|object-fit|object-position|offset-distance|offset-path|offset-rotation|opacity|order|orphans|outline|outline-offset|overflow|overflow-anchor|overflow-wrap|padding|page-break|perspective|perspective-origin|pointer-events|position|quotes|resize|right|scroll-behavior|scrollbar|shape-outside|speak|stroke|stroke-dasharray|stroke-dashoffset|stroke-linecap|stroke-width|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-skip|text-decoration-style|text-indent|text-overflow|text-rendering|text-shadow|text-stroke|text-transform|text-underline-position|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|user-select|vertical-align|visibility|white-space|widows|width|will-change|word-break|word-spacing|writing-mode|z-index|zoom|src)(?= |:|{)/g, '<span class="pre-sky">$&</span>')
					.replace(/\#[0-9a-f]{3,6}/g, '<span class="pre-brown">$&</span>')
					.replace(/\d*(px|\.\d|em|rem|pt)\b|\d(?= |;)/g, '<span class="pre-num">$&</span>')
					.replace(/'[^); ]*'/g, '<span class="pre-orange">$&</span>')
					.replace(/(transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|auto|baseline|center|space-between|space-around|unset|stretch|flex-start|flex-end|ease|ease-out|ease-in|ease-in-out|linear|cubic-bezier|forwards|backwards|both|none|normal|alternate|paused|running|repeat|repeat-x|repeat-y|no-repeat|space|round|top|left|right|center|bottom|cover|space|round|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|thin|medium|thick|rgb|rgba|hsl|hsla|both|default|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|all-scroll|col-resize|row-resize|n-resize|e-resize|s-resize|w-resize|ns-resize|ew-resize|ne-resize|nw-resize|se-resize|sw-resize|nesw-resize|nwse-resize|ltr|rtl|inherit|inline|inline-block|block|run-in|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|italic|oblique|small-caps|bold|bolder|lighter|xx-small|x-small|small|medium|large|x-large|xx-large|smaller|larger|percentage|percentage|static|relative|absolute|fixed|sticky|underline|line-through|overline|visible|scroll|collapse|middle|content-box|border-box|url|src|sans-serif|serif)(?=;| |:|\()/g, '<span class="pre-green">$&</span>')
					.replace(/(\/\*)[^]*(\*\/)|(\/\*)[^]*|[^]*(\*\/)| \*.*/g, '<span class="pre-green">$&</span>');
			}
			html += '\n';
		}
		return html;
	}

	function preHtml(node) {
		var html = '';
		var num = node.length;
		for (var i = 0; i < num; i += 1) {
			if (node[i] !== '') {
				html += node[i].replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/&copy;/g, '©')
					.replace(/\//g, '&#47;')
					.replace(/=/g, '&#61;')
					.replace(/"/g, '&#34;')
					.replace(/'/g, '&#34;')
					.replace(/(&lt;(?!!)(.*)\b(?= ))|(&lt;(?!!)(.(?! |&lt;))*(?=&gt;))/g, '<span class="pre-blue">$&</span>')
					.replace(/&gt;/g, '<span class="pre-blue">$&</span>')
					.replace(/&lt;!doctype html<span class="pre-blue">&gt;<\/span>/g, '<span class="pre-gray">&lt;!doctype html&gt;</span>')
					.replace(/(&lt;!-- )(.*)( --<span class="pre-blue">&gt;<\/span>)/g, '<span class="pre-green">&lt;!-- $2 --&gt;</span>')
					.replace(/&lt;!--/g, '<span class="pre-green">$&</span>')
					.replace(/--<span class="pre-blue">&gt;<\/span>/g, '<span class="pre-green">--&gt;</span>')
					.replace(/([a-z;>]{1} )((.[^&]*)(?=&#61;))/g, '$1<span class="pre-brown">$2</span>')
					.replace(/(&#34;(.[^ ]*)&#34;)/g, '<span class="pre-sky">$&</span>');
				html += '\n';
			}
		}
		return html;
	}

	function preText(node) {
		return node.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\//g, '&#47;')
			.replace(/=/g, '&#61;')
			.replace(/"/g, '&#34;')
			.replace(/{/g, '&#123;')
			.replace(/}/g, '&#125;')
			.replace(/:/g, '&#58;')
			.replace(/\(/g, '&#40;')
			.replace(/\)/g, '&#41;');
	}

	window.preColor = function (lang) {
		var el = sel.focusNode;
		var html = '';
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}

		switch (lang) {
			case 'javascript':
				html = preJs(el.textContent.split('\n'));
				break;
			case 'css':
				html = preCss(el.textContent.split('\n'));
				break;
			case 'html':
				html = preHtml(el.textContent.split('\n'));
				break;
			default:
				html = preText(el.textContent);
				break;
		}
		el.innerHTML = html;

		if(lang == 'css'){
			var note = el.querySelectorAll('span.pre-note');
			[].forEach.call(note, function (n) {
				n.innerHTML = n.textContent;
			});
		}

		var empty = el.querySelectorAll('span:empty');
		[].forEach.call(empty, function (span) {
			span.remove();
		});

		doc.focus();
	}

	function findNode(el) {
		if (el.constructor !== HTMLSpanElement) {
			return el;
		} else {
			return findNode(el.parentNode);
		}
	}

	window.checkDoc = function (event) {
		var el = sel.focusNode;
		if (el.constructor == Text) {
			el = sel.focusNode.parentNode;
		}

		el = findNode(el);

		if (el.constructor == HTMLElement || el.constructor == HTMLLIElement) {
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
			case HTMLUListElement:
				val = /ul/i;
				break;
			case HTMLOListElement:
				val = /ol/i;
				top.document.querySelector('.d-btn-list-type select').value = lang = el.getAttribute('type');
				break;
			case HTMLAnchorElement:
				val = /link/i;
				link.value = el.getAttribute('href');
				break;
			case HTMLPreElement:
				val = /pre/i;
				var lang = el.getAttribute('data-lang');
				top.document.querySelector('.d-btn-lang select').value = lang;
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
			} else {
				e.classList.remove('act');
			}
		});

		if (el.constructor == HTMLDivElement) {
			document.execCommand('formatBlock', true, 'p');
		}

		if (event.constructor == KeyboardEvent) {
			let key = event.key;
			if (el.constructor == HTMLBodyElement) {
				document.execCommand('insertHTML', true, '<p></p>');
			}

			if (event.key == 'Tab') {
				event.preventDefault();
				document.execCommand('insertText', true, '    ');
			} else if (key == 'Enter' && event.shiftKey == false) {
				if (el.constructor == HTMLElement || el.constructor == HTMLSpanElement) {
					el = el.parentNode;
				}

				if (el.constructor == HTMLPreElement) {
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
				}
			}
		}
	}
}