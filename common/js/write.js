function select(select){
	let item = document.querySelectorAll(select);

	if(item.length > 1){
		return item;
	}else{
		return item[0];
	}
}

let edite = false;
window.onload = function () {
	let iframe = select('.d_editor_frame'),
		loadValue = select('.d_editor_val').value;

	iframe.contentWindow.doc(loadValue);

	// add link
	select('.side_menu02 .op_link .btn_add').addEventListener('click', (e) => {
		let link = select('.side_menu02 .op_link input').value;
		iframe.focus();
		iframe.contentWindow.addLink(link);
		iframe.contentWindow.checkDoc(e);
	});
	// del link
	select('.side_menu02 .op_link .btn_del').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.delLink();
		iframe.contentWindow.checkDoc(e);
	});

	// bold
	select('.side_menu .btn_bold').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.bold();
	});

	// italic
	select('.side_menu .btn_italic').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.italic();
	});

	// underline
	select('.side_menu .btn_underline').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.italic();
	});

	// strike-out
	select('.side_menu .btn_strike').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.strikeOut();
	});

	// btn_block
	select('.side_menu .btn_block').addEventListener('click', () => {
		iframe.focus();
		iframe.contentWindow.block();
	});

	// text-align
	[].forEach.call(select('.side_menu .btn_align'), function (align) {
		align.addEventListener('click', () => {
			let type = align.getAttribute('data-type');
			iframe.focus();
			iframe.contentWindow.alignText(type);
		});
	});

	// 순서없는 리스트 추가
	select('.side_menu .btn_list01').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.addList('ul');
		iframe.contentWindow.checkDoc(e);
	});

	// 순서있는 리스트 추가
	select('.side_menu .btn_list02').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.addList('ol');
		iframe.contentWindow.checkDoc(e);
	});

	// quote
	select('.side_menu .btn_quote').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.quote();
		iframe.contentWindow.checkDoc(e);
	});

	// table
	select('.side_menu .btn_table').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.table();
		iframe.contentWindow.checkDoc(e);
	});

	// codeBlock
	select('.side_menu .btn_code').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.codeBlock();
		iframe.contentWindow.checkDoc(e);
	});

	select('.side_menu .op_font_size').addEventListener('change', function () {
		let val = this.value;
		iframe.focus();
		iframe.contentWindow.fontsSize(val);
	});

	select('.side_menu .op_color').addEventListener('change', function () {
		let val = this.value;
		iframe.focus();
		iframe.contentWindow.elementColor(val, 'color');
	});

	select('.side_menu .op_bg').addEventListener('change', function () {
		let val = this.value;
		iframe.focus();
		iframe.contentWindow.elementColor(val, 'bg');
	});

	select('.side_menu .op_ol_type select').addEventListener('change', function () {
		let val = this.value;
		iframe.focus();
		iframe.contentWindow.olType(val);
	});

	// td
	select('.side_menu .op_table_type .btn_td').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.tabelType('td');
		iframe.contentWindow.checkDoc(e);
	});

	// th
	select('.side_menu .op_table_type .btn_th').addEventListener('click', (e) => {
		iframe.focus();
		iframe.contentWindow.tabelType('th');
		iframe.contentWindow.checkDoc(e);
	});

	// table rewrite
	select('.side_menu .op_table .btn_rewrite').addEventListener('click', (e) => {
		let col = select('.side_menu .op_table .op_col').value,
			row = select('.side_menu .op_table .op_row').value;

		iframe.focus();
		iframe.contentWindow.reWriteTable(row, col);
		iframe.contentWindow.checkDoc(e);
	});

	// pre theme
	select('.side_menu .op_pre .op_pre_theme').addEventListener('change', function () {
		let theme = this.value;
		iframe.focus();
		iframe.contentWindow.preTheme(theme);
	});

	// pre lang
	select('.side_menu .op_pre .op_pre_lang').addEventListener('change', function () {
		let lang = this.value;
		iframe.focus();
		iframe.contentWindow.preLang(lang);
	});

	// view mode
	select('.side_menu .btn_view_mode').addEventListener('click', () => {
		let h = select('.d_editor_val').hidden;
		if (h == true) {
			let val = iframe.contentWindow.docValue();
			select('.d_editor_val').value = val;

			select('.d_editor_val').hidden = false;
			select('.d_editor_frame').hidden = true;
		} else {
			let val = select('.d_editor_val').value;
			iframe.contentWindow.doc(val);

			select('.d_editor_val').hidden = true;
			select('.d_editor_frame').hidden = false;
		}
	});

	select('.side_menu .btn_video').addEventListener('click', function(){
		select('.pop_bg').classList.add('act');
		select('.pop_video').classList.add('act');
	});

	select('.pop_video button').addEventListener('click', function(){
		let link = select('.pop_video input').value;
		select('.pop_bg').classList.remove('act');
		select('.pop_video').classList.remove('act');
		iframe.focus();
		iframe.contentWindow.addVideo(link);
	});

	// img size
	/*
	select('.side_menu .op_width').addEventListener('change', function () {
		let size = this.value;
		iframe.focus();
		iframe.contentWindow.imgSize(size);
	});
	*/

	// img size
	select('.side_menu .op_width_pc').addEventListener('change', function () {
		let size = this.value;
		iframe.focus();
		iframe.contentWindow.imgMaxSize(size);
	});

	select('.side_menu .btn_help').addEventListener('click', function () {
		select('.pop_bg').classList.add('act');
		select('.pop_help').classList.add('act');
	});

	select('.pop_bg').addEventListener('click', function () {

	select('.pop_bg').classList.remove('act');
		select('.pop_help').classList.remove('act');
		select('.pop_video').classList.remove('act');
	});

	let step = 0;
	select('.btn_addimg').addEventListener('click', function () {
		let item = select('.d_editor_img[data-num="' + step + '"]');
		item.click();

		timezone = 0;
		item.addEventListener('change', function () {
			let timetamp = new Date().getTime();
			if (timetamp - timezone >= 10) {

			let file = this.files[0],
					type_list = RegExp('png|jpeg|gif','g');

				if (type_list.test(file.type) == false) {
					alert(file.name + '은 이미지가 아닙니다.\n이미지만 선택해주세요.');
					this.value = '';
				} else if (file.size > 2097152) {
					alert(file.name + '은 용량을 초과했습니다.\n2mb 미만 파일만 선택해주세요.');
					this.value = '';
				} else {
					select('.imglist').insertAdjacentHTML('beforeend', '<input type="text" name="d_editor_img_name[]" value="' + timetamp + '_' + file.name + '" class="d_editor_img_name" data-num="' + step + '" hidden>');

					let url = window.URL.createObjectURL(file),
						html = '<li data-num="' + step + '">';
					html += '<div class="img"><img src="' + url + '" alt="' + timetamp + '_' + file.name + '"></div>';
					html += '<button type="button" class="btn_add">삽입</button> | <button type="button" class="btn_del">삭제</button>';
					html += '</li>';
					select('.doc_img_list').innerHTML += html;

					step += 1;
					select('.imglist').insertAdjacentHTML('beforeend', '<input type="file" accept="image/*" name="d_editor_img[]" class="d_editor_img" data-num="' + step + '" hidden>');
					timezone = timetamp;
					return;
				}
			}
		});
	});

	// add img
	select('.doc_img_list').addEventListener('click', function (e) {
		let child = e.target;
		if (child.className == 'btn_add') {
			let img = child.parentNode.querySelector('img'),
				src = img.src,
				w = img.naturalWidth,
				h = img.naturalHeight,
				name = img.getAttribute('alt');

			iframe.focus();
			iframe.contentWindow.addImg(src, w, h, name);
		} else if (child.className == 'btn_del') {
			let num = child.parentNode.getAttribute('data-num');
			child.parentNode.remove();
			select('.d_editor_img[data-num="' + num + '"]').remove();
			select('.d_editor_img_name[data-num="' + num + '"]').remove();
		}
	});

	let top = 0,
		height = 0,
		event = false;
	select('.d_editor .size').addEventListener('mousedown', function (e) {
		top = e.pageY;
		height = select('.d_editor').offsetHeight;
		event = true;
		return;
	});

	window.addEventListener('mousemove', (e) => {
		if (event == true) {
			select('.d_editor').style.height = height + (e.pageY - top) + 'px';
		}
	});

	window.addEventListener('mouseup', function (e) {
		event = false;
		return;
	});
}

window.addEventListener('keyup', function () {
	return edite = true;
});

window.onbeforeunload = function (e) {
	if (edite == true) {
		var dialogText = '변경사항이 저장되지 않을 수 있습니다.';
		e.returnValue = dialogText;
		return dialogText;
	}
}