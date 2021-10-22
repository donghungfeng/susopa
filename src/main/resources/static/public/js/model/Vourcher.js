var Vourcher = function(){
	var that = this;
	const URL = {
		GETALL:'vourcher/search',
		GETBYID:'vourcher/getbyid',
		SAVE:'vourcher/create',
		DEL:'vourcher/delete',
		GETBYCODE:'vourcher/getbycode'
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.code='';
	this.type='MONEY';
	this.percent=0;
	this.money=0;
	this.usage=0;
	this.outdate=0;
	this.note='';

	this.entity = null;

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
		this.type=item.type;
		this.percent=item.percent;
		this.money=item.money;
		this.usage=item.usage;
		this.outdate=item.outdate;
		this.note=item.note;
	}

	this.getByCode = function(){
		var rs = DATA.get(URL.GETBYCODE+"/"+that.code);
		var item = rs.RESULT;
		this.id=item.id;
		this.code=item.code;
		this.type=item.type;
		this.percent=item.percent;
		this.money=item.money;
		this.usage=item.usage;
		this.outdate=item.outdate;
		this.note=item.note;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			code:that.code,
			type:that.type,
			percent:that.percent,
			money:that.money,
			usage:that.usage,
			outdate:that.outdate,
			note:that.note
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
		var html = '<option  value="0"> - Chọn vourcher - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.code +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn vourcher- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.code +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}