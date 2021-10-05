const ApiOrionHelper = {
	test:function(sAction, oData){
		try {
			var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
			if (!oAUTH) {
				console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
				location.replace(CONFIG_APP.URL.LOGINPAGE);
			}
			var sToken = oAUTH.Token;
			var sTokenType = oAUTH.TokenType;
			_rs = null;
			var request = $.ajax({
				url: CONFIG_APP.URL.API_ORION + '/test/' + sAction + '/' + oData,
				type: "GET",
				contentType: 'application/json; charset=utf-8',
				dataType: "json",
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
					xhr.setRequestHeader("Authorization", sToken);
				}
			});
			request.done(function (_response) {
				//console.log('_response',_response);
				_rs = _response;
			});	
			request.fail(function (jqXHR, textStatus) {
				return false;
			});
			// Response Null
			if(!_rs){ return false;}

			// JWT expired 
			if(_rs.CODE==401){
				alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
				localStorage.clear();
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
				return false;
			}

			// Error
			if(_rs.CODE != 0){
				console.log('ERROR | ApiHelper.Orion.Get | ',_rs.MESSAGE);
				return {
					CODE:3,
					MESSAGE: 'ERROR | ApiHelper.Orion.Get | ' + _rs.MESSAGE,
					RESULT:[]
				}
			}

			return _rs;
		} catch (error) {
			return {
				CODE:3,
				MESSAGE: 'ERROR',
				RESULT:error
			}
		}
	},
	get:function(sAction, oData){
		try {
			var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
			if (!oAUTH) {
				console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
				location.replace(CONFIG_APP.URL.LOGINPAGE);
			}
			var sToken = oAUTH.Token;
			var sTokenType = oAUTH.TokenType;
			_rs = null;
			var request = $.ajax({
				url: CONFIG_APP.URL.API_ORION + '/' + sAction + '/' + oData,
				type: "GET",
				contentType: 'application/json; charset=utf-8',
				dataType: "json",
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
					xhr.setRequestHeader("Authorization", sToken);
				}
			});
			request.done(function (_response) {
				//console.log('_response',_response);
				_rs = _response;
			});	
			request.fail(function (jqXHR, textStatus) {
				return false;
			});
			// Response Null
			if(!_rs){ return false;}

			// JWT expired 
			if(_rs.CODE==401){
				alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
				localStorage.clear();
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
				return false;
			}

			// Error
			if(_rs.CODE != 0){
				console.log('ERROR | ApiHelper.Orion.Get | ',_rs.MESSAGE);
				return {
					CODE:3,
					MESSAGE: 'ERROR | ApiHelper.Orion.Get | ' + _rs.MESSAGE,
					RESULT:[]
				}
			}

			return _rs;
		} catch (error) {
			return {
				CODE:3,
				MESSAGE: 'ERROR',
				RESULT:error
			}
		}
	},
	set:function(sUrl, oData){
		try {
			var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
			if (!oAUTH) {
				console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
				location.replace(CONFIG_APP.URL.LOGINPAGE);
			}
			var sToken = oAUTH.Token;
			var sTokenType = oAUTH.TokenType;
			_rs = null;
			var request = $.ajax({
				url: CONFIG_APP.URL.API_DATA + '/set/' + sUrl,
				type: "POST",
				data: JSON.stringify(oData),
				contentType: 'application/json; charset=utf-8',
				dataType: "json",
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
					xhr.setRequestHeader("Authorization", sToken);
				}
			});
			request.done(function (_response) {
				//console.log('_response',_response);
				_rs = _response;
			});	
			request.fail(function (jqXHR, textStatus) {
				return false;
			});
			// Response Null
			if(!_rs){ return false;}

			// JWT expired 
			if(_rs.CODE==401){
				alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
				localStorage.clear();
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
				return false;
			}

			// Error
			if(_rs.CODE != 0){console.log('API DATA:',_rs.MESSAGE);}

			return _rs;
		} catch (error) {
			return {
				CODE:3,
				MESSAGE: 'ERROR',
				RESULT:error
			}
		}
	},
	getFileChamCong:function(){
		// Lấy danh sách file chấm công trên server
		try {
			var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
			if (!oAUTH) {
				console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
				location.replace(CONFIG_APP.URL.LOGINPAGE);
			}
			var sToken = oAUTH.Token;
			var sTokenType = oAUTH.TokenType;
			_rs = null;
			var request = $.ajax({
				url: CONFIG_APP.URL.API_ORION + '/common/filechamcong/list',
				type: "POST",
				contentType: 'application/json; charset=utf-8',
				dataType: "json",
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
					xhr.setRequestHeader("Authorization", sToken);
				}
			});
			request.done(function (_response) {
				//console.log('_response',_response);
				_rs = _response;
			});	
			request.fail(function (jqXHR, textStatus) {
				return false;
			});
			// Response Null
			if(!_rs){return false;}

			// JWT expired 
			if(_rs.CODE==401){
				alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
				localStorage.clear();
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
				return false;
			}

			// Error
			if(_rs.CODE != 0){
				console.log('ERROR | ApiHelper.Orion.Get | ',_rs.MESSAGE);
				return {
					CODE:3,
					MESSAGE: 'ERROR | ApiHelper.Orion.Get | ' + _rs.MESSAGE,
					RESULT:[]
				}
			}

			return _rs;
		} catch (error) {
			return {
				CODE:3,
				MESSAGE: 'ERROR',
				RESULT:error
			}
		}
	},
	loadDataChamCong:function(filename){
		const oData = {filename:filename};
		// Lấy danh sách file chấm công trên server
		try {
			var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
			if (!oAUTH) {
				console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
				location.replace(CONFIG_APP.URL.LOGINPAGE);
			}
			var sToken = oAUTH.Token;
			var sTokenType = oAUTH.TokenType;
			_rs = null;
			var request = $.ajax({
				url: CONFIG_APP.URL.API_ORION + '/common/filechamcong/loaddata',
				type: "POST",
				contentType: 'application/json; charset=utf-8',
				dataType: "json",
				data: JSON.stringify(oData),
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
					xhr.setRequestHeader("Authorization", sToken);
				}
			});
			request.done(function (_response) {
				//console.log('_response',_response);
				_rs = _response;
			});	
			request.fail(function (jqXHR, textStatus) {
				return false;
			});
			// Response Null
			if(!_rs){return false;}

			// JWT expired 
			if(_rs.CODE==401){
				alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
				localStorage.clear();
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
				return false;
			}

			// Error
			if(_rs.CODE != 0){
				console.log('ERROR | ApiHelper.Orion.Get | ',_rs.MESSAGE);
				return {
					CODE:3,
					MESSAGE: 'ERROR | ApiHelper.Orion.Get | ' + _rs.MESSAGE,
					RESULT:[]
				}
			}

			return _rs;
		} catch (error) {
			return {
				CODE:3,
				MESSAGE: 'ERROR',
				RESULT:error
			}
		}
	},
	getUsers:function(filename){
		const oData = {filename:filename};
		// Lấy danh sách file chấm công trên server
		try {
			var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
			if (!oAUTH) {
				console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
				location.replace(CONFIG_APP.URL.LOGINPAGE);
			}
			var sToken = oAUTH.Token;
			var sTokenType = oAUTH.TokenType;
			_rs = null;
			var request = $.ajax({
				url: CONFIG_APP.URL.API_ORION + '/common/filechamcong/users',
				type: "POST",
				contentType: 'application/json; charset=utf-8',
				dataType: "json",
				data: JSON.stringify(oData),
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
					xhr.setRequestHeader("Authorization", sToken);
				}
			});
			request.done(function (_response) {
				//console.log('_response',_response);
				_rs = _response;
			});	
			request.fail(function (jqXHR, textStatus) {
				return false;
			});
			// Response Null
			if(!_rs){ return false;}

			// JWT expired 
			if(_rs.CODE==401){
				alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
				localStorage.clear();
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
				return false;
			}

			// Error
			if(_rs.CODE != 0){
				console.log('ERROR | ApiHelper.Orion.Get | ',_rs.MESSAGE);
				return {
					CODE:3,
					MESSAGE: 'ERROR | ApiHelper.Orion.Get | ' + _rs.MESSAGE,
					RESULT:[]
				}
			}

			return _rs;
		} catch (error) {
			return {
				CODE:3,
				MESSAGE: 'ERROR',
				RESULT:error
			}
		}
	},
	loadEnters:function(filename,date){
		const oData = {filename:filename,date:date};
		// Lấy danh sách file chấm công trên server
		try {
			var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
			if (!oAUTH) {
				console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
				location.replace(CONFIG_APP.URL.LOGINPAGE);
			}
			var sToken = oAUTH.Token;
			var sTokenType = oAUTH.TokenType;
			_rs = null;
			var request = $.ajax({
				url: CONFIG_APP.URL.API_ORION + '/common/enters/import',
				type: "POST",
				contentType: 'application/json; charset=utf-8',
				dataType: "json",
				data: JSON.stringify(oData),
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
					xhr.setRequestHeader("Authorization", sToken);
				}
			});
			request.done(function (_response) {
				//console.log('_response',_response);
				_rs = _response;
			});	
			request.fail(function (jqXHR, textStatus) {
				return false;
			});
			// Response Null
			if(!_rs){ return false;}

			// JWT expired 
			if(_rs.CODE==401){
				alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
				localStorage.clear();
				location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
				return false;
			}

			// Error
			if(_rs.CODE != 0){
				console.log('ERROR | ApiHelper.Orion.Get | ',_rs.MESSAGE);
				return {
					CODE:3,
					MESSAGE: 'ERROR | ApiHelper.Orion.Get | ' + _rs.MESSAGE,
					RESULT:[]
				}
			}

			return _rs;
		} catch (error) {
			return {
				CODE:3,
				MESSAGE: 'ERROR',
				RESULT:error
			}
		}
	
	},
}