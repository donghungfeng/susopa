var OrderService = function(){
	var that = this;
	const URL = {
		GETALL:'orderservice/search',
		GETBYID:'orderservice/getbyid',
		SAVE:'orderservice/create',
		DEL:'orderservice/delete',
		GETBYTIME: 'orderservice/time',
		GETGROUPBYTIME: 'orderservice/grouptime',
		GETBYORDER:'orderservice/findbyorder'
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.description='';
	this.order=null;
	this.note='';
	this.status=0;
	this.price=0;
	this.count=0;
	this.time=0;
	this.serviceName='';
	this.serviceCode='';
	this.orderId = 0;

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
		var rs = DATA.set(URL.GETBYTIME,data);
		that.LIST = rs.RESULT;
	}
	this.getAllGroupByTime = function(from,to){
		var data= {
			from:from,
			to:to
		}
		var rs = DATA.set(URL.GETGROUPBYTIME,data);
		that.LIST = rs.RESULT;
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
		this.price=item.price;
		this.count=item.count;
		this.time=item.time;
		this.serviceCode=item.serviceCode;
		this.serviceName=item.serviceName;
	}

	// get data by order
	this.getByOrder = function(){
		if (that.orderId == 0 )
			return;
		var rs = DATA.get(URL.GETBYORDER+"/"+that.orderId);
		that.LIST = rs.RESULT;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			description:that.description,
			note:that.note,
			status:that.status,
			order:that.order,
			price:that.price,
			count:that.count,
			time:that.time,
			serviceName:that.serviceName,
			serviceCode:that.serviceCode,
			staff:null
		}
		console.log(data);
		return DATA.set(URL.SAVE,data);
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
			price:that.price,
			count:that.count,
			time:that.time,
			serviceName:that.serviceName,
			serviceCode:that.serviceCode
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}

	this.changeNote = function(note){
		that.getById();
		var data= {
			id:that.id,
			description:that.description,
			note:note,
			status:that.status,
			order:that.order,
			price:that.price,
			count:that.count,
			time:that.time,
			serviceName:that.serviceName,
			serviceCode:that.serviceCode
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