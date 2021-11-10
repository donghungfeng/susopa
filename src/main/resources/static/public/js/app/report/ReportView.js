var ReportView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Báo cáo đơn hàng';
	this.oTableOrder = null;
	this.oTableProduct = null;
	this.oTableService = null;
	this.oDialog = null;
	this.oOrder = new Order();
	this.oOrderProduct = new OrderProduct();
	this.oOrderService = new OrderService();
	this.oStaff = new Staff();
	this.totalAmount = 0;
	this.totalOrderProduct = 0;
	this.totalOrderService = 0;
	this.totalAmountProduct = 0;
	this.totalAmountService = 0;
	this.totalDiscountStaff = 0;
	this.totalOrder = 0;
	this.from = 0;
	this.to = 99999999999999999;
	this.staffid = 0;

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.oOrder.getAll();
		that.oOrderProduct.getAll();
		that.oOrderService.getAll();
		that.oStaff.bindSelect2('#staff');
		that.resetForm();
		that.bindGridOrder();
		that.bindGridProduct();
		that.bindGridService();
	}

	this.resetForm = function () {
		$('#fromDate').val('');
		$('#toDate').val('');
		$('#filterFast').val('');
	}

	this.convertTimestamp = function(time){
		let d = new Date(time);
		return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}

	this.convertMoney = function (money) {
		return money.toLocaleString('vi', {style : 'currency', currency : 'VND'});
	}

	this.bindGridOrder = function(){
		that.totalOrder = that.oOrder.LIST.length;
		this.totalAmount = 0;
		this.totalOrderProduct = 0;
		this.totalOrderService = 0;
		that.oTableOrder.clear().draw();
		var aRows = [];
		console.log(that.oOrder.LIST);
		for (var i = 0; i < that.oOrder.LIST.length; i++) {
			var item = that.oOrder.LIST[i];
			that.totalAmount += item.amount;
			that.totalOrderProduct += item.countProduct;
			that.totalOrderService += item.countService;
			aRows.push([
				(i + 1),
				item.code,
				item.customerName + " ("+ item.customerPhone+") ",
				item.countProduct,
				item.countService,
				that.convertMoney(item.amount),
				that.convertTimestamp(item.time),
				item.status,
            ]);
		}
		that.oTableOrder.rows.add(aRows).draw();
		$('#totalAmount').html(that.convertMoney(this.totalAmount));
		$('#totalOrderService').html(this.totalOrderService);
		$('#totalOrderProduct').html(this.totalOrderProduct);
	}

	this.bindGridProduct = function(){
		this.totalAmountProduct = 0;
		that.oTableProduct.clear().draw();
		var aRows = [];
		console.log(that.oOrderProduct.LIST);
		for (var i = 0; i < that.oOrderProduct.LIST.length; i++) {
			var item = that.oOrderProduct.LIST[i];
			that.totalAmountProduct += item.count*item.price;
			aRows.push([
				(i + 1),
				item.order.code,
				item.productCode,
				item.productName,
				that.convertMoney(item.price),
				item.count,
				that.convertTimestamp(item.time),
			]);
		}
		that.oTableProduct.rows.add(aRows).draw();
		$('#totalAmountProduct').html(that.convertMoney(this.totalAmountProduct));
	}

	this.bindGridService = function(){
		this.totalAmountService = 0;
		this.totalDiscountStaff = 0;
		that.oTableService.clear().draw();
		var aRows = [];
		console.log(that.oOrderService.LIST);
		for (var i = 0; i < that.oOrderService.LIST.length; i++) {
			var item = that.oOrderService.LIST[i];
			that.totalAmountService += item.count*item.price;
			that.totalDiscountStaff += item.discount;
			let staff = item.staff ? item.staff.name : '';
			aRows.push([
				(i + 1),
				item.order.code,
				item.serviceCode,
				item.serviceName,
				that.convertMoney(item.price),
				that.convertMoney(item.discount),
				staff,
				that.convertTimestamp(item.time),
				item.description
			]);
		}
		that.oTableService.rows.add(aRows).draw();
		$('#totalAmountService').html(that.convertMoney(this.totalAmountService));
		$('#totalDiscountStaff').html(that.convertMoney(this.totalDiscountStaff));
	}


	// Sự kiện
	$(document).ready(function () {

		that.oTableOrder = ControlHelper.Datatable.Init('GridOrder', 10, true);
		that.oTableProduct = ControlHelper.Datatable.Init('GridProduct', 10, true);
		that.oTableService = ControlHelper.Datatable.Init('GridService', 10, true);
		that.oDialog = new PopupDialog(reload);

		that.initPage();

		function reload() {
			that.bindGridOrder();
			that.bindGridProduct();
			that.bindGridService();
		}

		$('#btnFilter').on('click', function () {
			$('#filterFast').val('');
			if(!$('#fromDate').val() | !$('#toDate').val()){
				alert("Chọn từ ngày & đến ngày đi sếp!!!!");
				return;
			}
			that.from = new Date($('#fromDate').val()+ " 00:00").getTime();
			that.to = new Date($('#toDate').val()+ " 23:59").getTime();

			that.oOrder.getAllByTime(that.from,that.to);
			that.oOrderProduct.getAllByTime(that.from,that.to);
			that.oOrderService.getAllByTimeWithStaff(that.from,that.to,that.staffid);
			that.bindGridOrder();
			that.bindGridProduct();
			that.bindGridService();

		});
		$('#btnRefresh').on('click', function () {
			that.initPage();

		});

		$('#filterFast').on('change', function () {
			$('#fromDate').val('');
			$('#toDate').val('');

			that.from = 0;
			that.to = 0;
			let d = new Date();

			let filter = $('#filterFast').val();
			if(filter === ''){
				that.oOrder.getAll();
				that.oOrderProduct.getAll();
				that.oOrderService.getAll();
				that.bindGridOrder();
				that.bindGridProduct();
				that.bindGridService()
				return;
			}
			else if(filter === 'day'){
				that.from = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+d.getDate() + " "+"00:00").getTime();
				that.to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+d.getDate() + " "+"23:59").getTime();
			}
			else if(filter === 'week'){
				if(d.getDay() === 0){
					that.from = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+(d.getDate() - 6) + " "+"00:00").getTime();
				}
				else {
					that.from = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+(d.getDate() - d.getDay() +1 ) + " "+"00:00").getTime();
				}

				that.to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ d.getDate() + " "+"23:59").getTime();
			}
			else if(filter === 'month'){
				that.from = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ "01" + " "+"00:00").getTime();
				that.to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ d.getDate() + " "+"23:59").getTime();
			}
			else if(filter === 'year'){
				that.from = new Date(d.getFullYear()+"-" + "01" +"-"+ "01" + " "+"00:00").getTime();
				that.to = new Date(d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ d.getDate() + " "+"23:59").getTime();
			}
			that.oOrder.getAllByTime(that.from,that.to);
			that.oOrderProduct.getAllByTime(that.from,that.to);
			that.oOrderService.getAllByTimeWithStaff(that.from,that.to,that.staffid);
			that.bindGridOrder();
			that.bindGridProduct();
			that.bindGridService()

		});

		$('#staff').on('change', function () {
			that.staffid = $('#staff').val();
			that.oOrderService.getAllByTimeWithStaff(that.from,that.to,that.staffid);
			that.bindGridService();

		});


	});
}