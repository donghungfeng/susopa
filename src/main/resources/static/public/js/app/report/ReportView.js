var ReportView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Báo cáo';
	this.oTableOrder = null;
	this.oDialog = null;
	this.oOrder = new Order();
	this.totalAmount = 0;
	this.totalOrderProduct = 0;
	this.totalOrderService = 0;

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		that.oOrder.getAll();

		that.oTableOrder.clear().draw();
		var aRows = [];
		console.log(that.oOrder.LIST);
		for (var i = 0; i < that.oOrder.LIST.length; i++) {
			var item = that.oOrder.LIST[i];
			aRows.push([
				(i + 1),
				item.code,
				item.customerName + " ("+ item.customerPhone+") ",
				item.countProduct,
				item.countService,
				item.amount,
				item.time,
				item.status,
            ]);
		}
		that.oTableOrder.rows.add(aRows).draw();
	}


	// Sự kiện
	$(document).ready(function () {

		that.oTableOrder = ControlHelper.Datatable.Init('GridOrder', 10, true);
		that.oDialog = new PopupDialog(reload);

		that.initPage();

		function reload() {
			that.bindGrid();
		}


	});
}