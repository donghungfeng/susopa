var Product = function(){
	var that = this;
	const URL = {
		GETALL:'product/search',
		GETBYID:'product/getbyid',
		SAVE:'product/create',
		DEL:'product/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.code='';
	this.name='';
	this.price=0;
	this.discount=0;
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
		this.code=item.code;
		this.name=item.name;
		this.price=item.price;
		this.discount=item.discount;
		this.note=item.note;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			code:that.code,
			name:that.name,
			price:that.price,
			discount:that.discount,
			note:that.note,
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(){
		return DATA.get(URL.DEL+"/"+that.id);
	}
	
	this.bindSelect = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> - Chọn sản phẩm - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn sản phẩm- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}