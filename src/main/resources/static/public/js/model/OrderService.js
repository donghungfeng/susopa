var OrderService = function(){
	var that = this;
	const URL = {
		GETALL:'orderservice/search',
		GETBYID:'orderservice/getbyid',
		SAVE:'orderservice/create',
		DEL:'orderservice/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.description='';
	this.order=null;
	this.service=null;
	this.note='';
	this.status=0;

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
		this.description=item.description;
		this.note=item.note;
		this.status=item.status;
		this.order=item.order;
		this.service=item.service;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			description:that.description,
			note:that.note,
			status:that.status,
			order:that.order,
			service:that.service
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(){
		return DATA.get(URL.DEL+"/"+that.id);
	}

	this.changeStatus = function(){
		that.getById();
		var data= {
			id:that.id,
			description:that.description,
			note:that.note,
			status:that.status+1,
			order:that.order,
			service:that.service
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}
	
	this.bindSelect = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> - Chọn màu - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn màu- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}