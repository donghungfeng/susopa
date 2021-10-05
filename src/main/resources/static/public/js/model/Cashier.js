var Cashier = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		SEARCH:'cashier/search',
		LOCK:'cashier/lock',
		UNLOCK:'cashier/unlock',
		SAVE:'cashier/save',
		DETAILS:'cashier/details',
		DEL:'cashier/delete',
		CHECKCONNECT:'cashier/checkconnect'
	}

	this.cashierid = 0;
	this.code = '';
	this.name = '';
	this.ipaddress = '';
	this.status = 1;
	this.posterminalid = 0;



	this.search = function(key){
		return DATA.get(URL.SEARCH + '/' + key);
	}

	this.getDetails = function(){
		var rs = DATA.get(URL.DETAILS + '/' + that.cashierid);
		var item = rs.RESULT;
		that.code = item.code;
		that.name = item.name;
		that.ipaddress = item.ipaddress;
		that.status = item.status;
		that.posterminalid = item.posterminalid;
		return rs;
	}

	this.lock = function(id){
		return DATA.put(URL.LOCK + '/' + id);
	}

	this.unlock = function(id){
		return DATA.put(URL.UNLOCK + '/' + id);
	}

	this.checkConnect = function(){
		return DATA.get(URL.CHECKCONNECT + "/" + that.cashierid);
	}

	this.validSave = function(){
		var alert = '';

		if(that.code.length < 3){
			alert += 'Không được để trống mã';
		}
		if(that.name.length < 3){
			alert += 'Không được để trống mã';
		}
		return alert;
	}

	this.save = function(){
		var cashier = {
				cashierid:that.cashierid,
				code:that.code,
				name:that.name,
				ipaddress:that.ipaddress,
				status:that.status,
				posterminalid:that.posterminalid
		}
		return DATA.post(URL.SAVE,cashier);
	}

	this.del = function(id){
		return DATA.del(URL.DEL + '/' + id);
	}

	this.bindSelect = function(sControlId){
		var LIST = that.search("").RESULT;
		var html = '<option value="0">Chọn quầy thu ngân </option>';
		for (let i = 0; i < LIST.length; i++) {
			var item = LIST[i];
			if(item.status==1)
				html +='<option  value="'+ item.cashierid +'">' + item.code +'</option>';
		}
		$(sControlId).html(html);
	}

}
