var Staff = function(){
	var that = this;
	const URL = {
		GETALL:'staff/search',
		GETBYID:'staff/getbyid',
		SAVE:'staff/create',
		DEL:'staff/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.name='';
	this.phone='';
	this.code='';
	this.status=0;
	this.note='';

	this.validSave = function(){
		var alert = '';

		if(that.name.length < 1){
			alert += '(*) ' + LABEL.INVALID_name + '<br/> ';
		}
		return alert;
	}

    this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs.RESULT;
		console.log(rs);
	}
	
	// get data by id
	this.getById = function(){
		var rs = DATA.get(URL.GETBYID+"/"+that.id);
		var item = rs.RESULT;
		this.id=item.id;
		this.name=item.name;
		this.phone=item.phone;
		this.code=item.code;
		this.status=item.status;
		this.note=item.note;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			name:that.name,
			phone:that.phone,
			code:that.code,
			status:that.status,
			note:that.note,
		}

		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(){
		alert("Không thể xóa nhân viên, vui lòng liên hệ DHF để xóa");
		return;
		// return DATA.get(URL.DEL+"/"+that.id);
	}

	this.bindSelectHtml = function(){
		that.getAll();
		var html = '<select class="form-control">';
		html += '<option  value="0"> - Chọn nhân viên - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			if(item.status == 1)
				html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		html +='</select>';
		return html;
	}
	
	this.bindSelect = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> - Chọn nhân viên - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			if(item.status == 1)
				html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn nhân viên- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			if(item.status == 1)
				html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}