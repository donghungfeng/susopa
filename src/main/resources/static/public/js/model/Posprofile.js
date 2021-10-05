var Posprofile = function(){
    var that = this;
    this.LIST = [];
    const URL = {
		SEARCH:'posprofile/all',
		SAVE:'posprofile/save',
		DETAILS:'posprofile/details',
		DEL:'posprofile/delete',
		CHECKCONNECT:'posprofile/checkconnect'
    }

    this.posprofileid = 0;
	this.code = '';
	this.name = '';
	this.bankname = '';
    this.bankendpoint = '';
    this.port = 0;
    this.metadata = '';

    this.search = function(){
		return DATA.get(URL.SEARCH);
    }

    this.getDetails = function(){
		var rs = DATA.get(URL.DETAILS + '/' + that.posprofileid);
		var item = rs.RESULT;
		that.code = item.code;
		that.name = item.name;
		that.bankname = item.bankname;
        that.bankendpoint = item.bankendpoint;
        that.port = item.port;
        that.metadata = item.metadata;
		return rs;
    }

    this.checkConnect = function(){
		return DATA.get(URL.CHECKCONNECT + "/" + that.posprofileid);
    }

    this.validSave = function(){
		var alert = '';

		if(that.code.length < 3){
			alert += 'Không được để trống mã';
		}
		if(that.name.length < 3){
			alert += 'Không được để trống tên';
        }
        if(that.bankname.length < 3){
			alert += 'Không được để trống tên ngân hàng';
		}
		return alert;
    }

	this.save = function(){
		var posprofile = {
				posprofileid:that.posprofileid,
				code:that.code,
				name:that.name,
				bankname:that.bankname,
        bankendpoint:that.bankendpoint,
        port:that.port,
        metadata:that.metadata
		}
		return DATA.post(URL.SAVE,posprofile);
	}

	this.del = function(id){
		return DATA.del(URL.DEL + '/' + id);
	}
	this.bindSelect = function(sControlId){
		var LIST = that.search().RESULT;
		var html = '<option value="0">Chọn cấu hình POS </option>';
		for (let i = 0; i < LIST.length; i++) {
			var item = LIST[i];
			html +='<option  value="'+ item.posprofileid +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
	}
}
