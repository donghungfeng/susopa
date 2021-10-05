var HisterminalView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Histerminal';
	this.oTable = null;
	this.oDialog = null;
	this.oHisterminal = new Histerminal();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindForm();
	}
	
	this.bindForm = function(){
		var rs = that.oHisterminal.getDetails().RESULT;
		$("#url").val(rs.url);
		$("#account").val(rs.account);
		$("#token").val(rs.token);
		
	}


	// Sự kiện
	$(document).ready(function () {
		
		that.oDialog = new PopupDialog(reload);
		
		that.initPage();

		function reload() {
			that.bindForm();
		}
	
		$('.ACTIONS').on('click', '#btnSave', function () {
			that.oHisterminal.url = $("#url").val();
			that.oHisterminal.account = $("#account").val();
			that.oHisterminal.token = $("#token").val();
			that.oHisterminal.save();
		});

		
	});
}