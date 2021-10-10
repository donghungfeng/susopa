var Customer = function(){
	var that = this;
	const URL = {
		GETALL:'customer/search',
		GETBYID:'customer/getbyid',
		SAVE:'customer/create',
		DEL:'customer/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.name='';
	this.phone='';
	this.address='';
	this.email="";
	this.orders=0;
	this.amount=0;
	this.ranking=0;
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
		this.name=item.name;
		this.phone=item.phone;
		this.address=item.address;
		this.email=item.email;
		this.orders=item.orders;
		this.amount=item.amount;
		this.ranking=item.ranking;
		this.discount=item.discount;
		this.note=item.note;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			name:that.name,
			phone:that.phone,
			address:that.address,
			email:that.email,
			orders:that.orders,
			amount:that.amount,
			ranking:that.ranking,
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
		var html = '<option  value="0"> - Chọn khách hàng - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn khách hàng- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.phone + ' (' + item.name + ') ' +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}