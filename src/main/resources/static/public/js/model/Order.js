var Order = function(){
	var that = this;
	const URL = {
		GETALL:'order/search',
		GETBYID:'order/getbyid',
		GETBYTIME:'order/time',
		SAVE:'order/create',
		DEL:'order/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.code='';
	this.amount=0;
	this.received = 0;
	this.time = 0;
	this.customerPhone = '';
	this.customerName = '';
	this.status='';
	this.countProduct = 0;
	this.countService = 0;

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
	this.getAllByTime = function(from,to){
		var data= {
			from:from,
			to:to
		}
		console.log(data);
		var rs = DATA.set(URL.GETBYTIME,data);
		that.LIST = rs.RESULT;
		console.log(rs);
	}
	
	// get data by id
	this.getById = function(){
		var rs = DATA.get(URL.GETBYID+"/"+that.id);
		var item = rs.RESULT;
		this.id=item.id;
		this.code=item.code;
		this.amount=item.amount;
		this.received=item.received;
		this.time=item.time;
		this.customerName=item.customerName;
		this.customerPhone=item.customerPhone;
		this.status=item.status;
		this.countProduct=item.countProduct;
		this.countService=item.countService;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			code:that.code,
			amount:that.amount,
			received:that.received,
			time:that.time,
			customerName:that.customerName,
			customerPhone:that.customerPhone,
			status:that.status,
			countProduct:that.countProduct,
			countService:that.countService
		}
		console.log(data);
		return DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(){
		return DATA.get(URL.DEL+"/"+that.id);
	}
	
	this.bindSelect = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> - Chọn size - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn size- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}