var Posterminal = function(){
    var that = this;
    this.LIST = [];
    const URL = {
		SEARCH:'posterminal/search',
		LOCK:'posterminal/lock',
		UNLOCK:'posterminal/unlock',
		SAVE:'posterminal/save',
		DETAILS:'posterminal/details',
		DEL:'posterminal/delete',
		TESTCONNECT:'posterminal/checkconnect',
		TESTSALE:'payment/sale'
    }

    this.posterminalid = 0;
	this.code = '';
	this.name = '';
	this.ipaddress = '';
	this.status = 1;
	this.port = 0;
	this.posprofileid = 0;
	this.poscode = '';
	this.bankname = '';

    this.search = function(key){
		return DATA.get(URL.SEARCH + '/' + key);
    }

    this.getDetails = function(){
		var rs = DATA.get(URL.DETAILS + '/' + that.posterminalid);
		var item = rs.RESULT;
		that.code = item.code;
		that.name = item.name;
		that.ipaddress = item.ipaddress;
		that.status = item.status;
		that.port = item.port;
		that.posprofileid = item.posprofileid;
		that.poscode = item.poscode;
		that.bankname = item.bankname;
		return rs;
    }

    this.lock = function(id){
		return DATA.put(URL.LOCK + '/' + id);
    }

    this.unlock = function(id){
		return DATA.put(URL.UNLOCK + '/' + id);
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
		var posterminal = {
                posterminalid:that.posterminalid,
				code:that.code,
				name:that.name,
				ipaddress:that.ipaddress,
				status:that.status,
				port:that.port,
				posprofileid:that.posprofileid
		}
		return DATA.post(URL.SAVE,posterminal);
    }

    this.del = function(id){
		return DATA.del(URL.DEL + '/' + id);
	}

	this.checkConnect = function(){
		return DATA.get(URL.TESTCONNECT + '/' + that.posterminalid);
	}


	this.bindSelect = function(sControlId){
		var LIST = that.search("").RESULT;
		var html = '<option value="0">Chọn POS Terminal </option>';
		for (let i = 0; i < LIST.length; i++) {
			var item = LIST[i];
			if(item.status==1)
				html +='<option  value="'+ item.posterminalid +'">' + item.code +'</option>';
		}
		$(sControlId).html(html);
	}
}
