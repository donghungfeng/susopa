var Histerminal = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		SAVE:'histerminal/save',
		DETAILS:'histerminal/details',
	}
	
	this.url = '';
	this.account = '';
	this.token = '';
	
	this.getDetails = function(){
		var rs = DATA.get(URL.DETAILS);
		var item = rs.RESULT;
		that.url = item.url;
		that.account = item.account;
		that.token = item.token;
		return rs;
	}
	
	this.validSave = function(){
		var alert = '';

		if(that.url.length < 3){
			alert += 'Không được để trống mã';
		}
		if(that.account.length < 3){
			alert += 'Không được để trống tài khoản';
		}
		if(that.token.length < 3){
			alert += 'Không được để trống token';
		}
		return alert;
	}

	this.save = function(){
		that.validSave();
		var cashier = {
				url:that.url,
				account:that.account,
				token:that.token
		}
		return DATA.post(URL.SAVE,cashier);
	}


}