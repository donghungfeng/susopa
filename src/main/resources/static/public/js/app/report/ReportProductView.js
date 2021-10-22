var ReportProductView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Báo cáo sản phẩm';
	this.oTableProduct = null;
	this.oTableService = null;
	this.oDialog = null;
	this.oOrderProduct = new OrderProduct();
	this.oOrderService = new OrderService();
	this.totalAmountProduct = 0;
	this.totalAmountService = 0;

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.oOrderProduct.getAllGroupByTime(0,new Date().getTime());
		that.oOrderService.getAllGroupByTime(0,new Date().getTime());
		that.resetForm();
		that.bindGridProduct();
		that.bindGridService();
	}

	this.convertTimestamp = function(time){
		let d = new Date(time);
		return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}
	this.resetForm = function () {
		$('#fromDate').val('');
		$('#toDate').val('');
		$('#filterFast').val('');
	}

	this.convertMoney = function (money) {
		return money.toLocaleString('vi', {style : 'currency', currency : 'VND'});
	}

	this.bindGridProduct = function(){
		this.totalAmountProduct = 0;
		that.oTableProduct.clear().draw();
		var aRows = [];
		console.log(that.oOrderProduct.LIST);
		for (var i = 0; i < that.oOrderProduct.LIST.length; i++) {
			var item = that.oOrderProduct.LIST[i];
			that.totalAmountProduct += parseFloat(item[3]);
			aRows.push([
				(i + 1),
				item[0],
				item[1],
				item[2],
				that.convertMoney(parseFloat(item[3])),
			]);
		}
		that.oTableProduct.rows.add(aRows).draw();
		$('#totalAmountProduct').html(that.convertMoney(this.totalAmountProduct));
	}

	this.bindGridService = function(){
		this.totalAmountService = 0;
		that.oTableService.clear().draw();
		var aRows = [];
		console.log(that.oOrderService.LIST);
		for (var i = 0; i < that.oOrderService.LIST.length; i++) {
			var item = that.oOrderService.LIST[i];
			that.totalAmountService += parseFloat(item[3]);
			aRows.push([
				(i + 1),
				item[0],
				item[1],
				item[2],
				that.convertMoney(parseFloat(item[3])),
			]);
		}
		that.oTableService.rows.add(aRows).draw();
		$('#totalAmountService').html(that.convertMoney(this.totalAmountService));
	}


	// Sự kiện
	$(document).ready(function () {

		that.oTableProduct = ControlHelper.Datatable.Init('GridProduct', 10, true);
		that.oTableService = ControlHelper.Datatable.Init('GridService', 10, true);
		that.oDialog = new PopupDialog(reload);

		that.initPage();

		function reload() {
			that.bindGridProduct();
			that.bindGridService();
		}

		$('#btnFilter').on('click', function () {
			$('#filterFast').val('');
			if(!$('#fromDate').val() | !$('#toDate').val()){
				alert("Chọn từ ngày & đến ngày đi sếp!!!!");
				return;
			}
			let from = new Date($('#fromDate').val()+ " 00:00").getTime();
			let to = new Date($('#toDate').val()+ " 23:59").getTime();

			that.oOrderProduct.getAllGroupByTime(from,to);
			that.oOrderService.getAllGroupByTime(from,to);
			that.bindGridProduct();
			that.bindGridService();

		});
		$('#btnRefresh').on('click', function () {
			that.initPage();

		});

		$('#filterFast').on('change', function () {
			$('#fromDate').val('');
			$('#toDate').val('');

			let from = 0;
			let to = 0;
			let d = new Date();

			let filter = $('#filterFast').val();
			if(filter === ''){
				that.oOrderProduct.getAllGroupByTime(0,new Date().getTime());
				that.oOrderService.getAllGroupByTime(0,new Date().getTime());
				that.bindGridProduct();
				that.bindGridService()
				return;
			}
			else if(filter === 'day'){
				from = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+d.getDate() + " "+"00:00").getTime();
				to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+d.getDate() + " "+"23:59").getTime();
			}
			else if(filter === 'week'){
				from = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+(d.getDate() - d.getDay() +1 ) + " "+"00:00").getTime();
				to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ d.getDate() + " "+"23:59").getTime();
			}
			else if(filter === 'month'){
				from = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ "01" + " "+"00:00").getTime();
				to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ d.getDate() + " "+"23:59").getTime();
			}
			else if(filter === 'year'){
				from = new Date(d.getFullYear()+"-" + "01" +"-"+ "01" + " "+"00:00").getTime();
				to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ d.getDate() + " "+"23:59").getTime();
			}
			that.oOrderProduct.getAllGroupByTime(from,to);
			that.oOrderService.getAllGroupByTime(from,to);
			that.bindGridProduct();
			that.bindGridService()

		});


	});
}