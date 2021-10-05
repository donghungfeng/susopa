var ConnectionAddView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Thêm mới kết nối';
	this.oTable = null;
	this.oDialog = null;
	this.oCashier = new Cashier();
	that.oPosterminal = new Posterminal();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindSelect();
	}
	this.bindSelect = function () {
		that.oCashier.bindSelect("#selCashierid");
		that.oPosterminal.bindSelect("#selPosterminalid");
	}

	// Sự kiện
	$(document).ready(function () {
		
		that.initPage();

		$("#selCashierid").on('change', function () {
			that.oCashier.cashierid = ($("#selCashierid").val());
			if(that.oCashier.cashierid > 0){
				var item = that.oCashier.getDetails().RESULT;
				$("#txtcashiername").val(item.name);
				$("#txtcashieripaddress").val(item.ipaddress);
			}
		});
		$("#selPosterminalid").on('change', function () {
			that.oPosterminal.posterminalid = ($("#selPosterminalid").val());
			if(that.oPosterminal.posterminalid > 0){
				var item = that.oPosterminal.getDetails().RESULT;
				$("#txtposterminalipaddress").val(item.ipaddress);
			}
		});
		


		
	});
}