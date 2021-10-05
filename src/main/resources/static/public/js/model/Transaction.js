var Transaction = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		SEARCH:'transaction/search',
		SEARCHBYTIME:'payment/log',
		CHECKCONNECT:'cashier/checkconnect'
	}
	this.fromDate = "";
	this.toDate = "";


	this.search = function(key){
		return DATA.get(URL.SEARCH);
	}

	this.searchByTime = function(){
		var transLog = {
			fromDate:that.fromDate,
			toDate:that.toDate
		}
		return DATA.post(URL.SEARCHBYTIME,transLog);
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
