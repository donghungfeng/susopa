var OrderServiceView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Danh sách dịch vụ cần thực hiện';
	this.oTable = null;
	this.oTableService = null;
	this.oDialog = null;
	this.oOrderService = new OrderService();
	this.oOrderProduct = new OrderProduct();
	this.oOrder = new Order();
	this.oStaff = new Staff();
	this.oCustomer = new Customer();
	this.htmlBillProductTable = '';
	this.htmlBillServiceTable = '';

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
		// that.bindGridService();
		// $('#Grid02_filter label').css("font-size","0px");
	}

	this.bindGrid = function(){
		that.oOrder.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		console.log(that.oOrder.LIST);
		for (var i = 0; i < that.oOrder.LIST.length; i++) {
			var item = that.oOrder.LIST[i];
			var act = '<div class="">';
			var hidden = '<input type="hidden" class="rowID" value="' + item.id + '" />';
			act += '<label class="label label-danger btnDel" style="cursor: cell" data-id="'+ item.id +'"><i class="fa fa-trash"></i></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			switch (item.status) {
				case -1:
					act += '<label class="label label-danger">Đã hủy</label>';
					break;
				case 0:
					act += '<label class="label label-success btnStatus" style="cursor: cell" data-id="'+ item.id +'">Tiếp nhận</label>';
					break;
				case 1:
					act += '<label class="label label-warning btnStatus" style="cursor: cell" data-id="'+ item.id +'">Đang xử lý</label>';
					break;
				case 2:
					act += '<label class="label label-info btnStatus" style="cursor: cell" data-id="'+ item.id +'">Hoàn thành</label>';
					break;
				case 3:
					act += '<label class="label label-primary">Đã giao khách</label>';
					break;
				default:
			}
			// let _note = '<span class="btnNote form-control" style="width: 100%" data-id="'+item.id+'">'+item.note+'</span>';
			act += '</div>';
			let detail = '<label class="label label-default btnDetail" style="cursor: all-scroll" data-id="'+ item.id +'"><i class="fa fa-print"></i></label>';
			let _time = '<span style="font-size: 0px">' +item.time+ '</span>';
			let _expirationTime = '<span style="font-size: 0px">' +item.expirationTime+ '</span>';
			aRows.push([
				(i + 1) + hidden,
				item.code,
				item.customerName + " ("+ item.customerPhone+") ",
				item.countProduct,
				item.countService,
				that.convertMoney(item.amount),
				_time + that.convertTimestamp(item.time),
				_expirationTime + that.convertTimestampHT(item.expirationTime),
				act,
				detail
            ]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.bindGridService = function(){
		that.oOrderService.getByOrder();
		that.oTableService.clear().draw();
		let staffSelectHtml = that.oStaff.bindSelectHtml();
		var aRows = [];
		for (var i = 0; i < that.oOrderService.LIST.length; i++) {
			var item = that.oOrderService.LIST[i];
			let _note = '<span class="btnNote form-control" style="width: 100%" data-serviceid="'+item.id+'">'+item.note+'</span>';
			let _sel = item.staff ? item.staff.name : '<select class="btnStaff form-control" data-serviceid="'+item.id+'">' + staffSelectHtml + '</select>';
			aRows.push([
				(i + 1),
				item.serviceName,
				item.description,
				item.realPrice,
				_sel,
				_note
			]);
		}
		that.oTableService.rows.add(aRows).draw();
	}

	this.renderBillTable = function(){
		that.htmlBillProductTable = "";
		that.htmlBillServiceTable = "";
		for (var i = 0; i < that.oOrderProduct.LIST.length; i++) {
			var item = that.oOrderProduct.LIST[i];
			that.htmlBillProductTable += '<tr>';
			that.htmlBillProductTable += '<td colspan="3" class="border-dotted">' +item.productName + '</td>';
			that.htmlBillProductTable += '</tr><tr>';
			that.htmlBillProductTable += '<td>' +parseFloat(item.realPrice).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			that.htmlBillProductTable += '<td class="text-center">' +item.count+ '</td>';
			that.htmlBillProductTable += '<td class="text-right">' +(item.realPrice * item.count).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			that.htmlBillProductTable += '</tr>';
		}
		let des = "";
		let shoe = 1;
		for (var i = 0; i < that.oOrderService.LIST.length; i++) {
			var item = that.oOrderService.LIST[i];
			if(des != item.description){
				that.htmlBillServiceTable += '<tr>';
				that.htmlBillServiceTable += '<td colspan="2" class="border-dotted"> Đôi số: '+ shoe + '</td>';
				that.htmlBillServiceTable += '</tr><tr>';
				that.htmlBillServiceTable += '<td colspan="2">' + item.description + '</td>';
				that.htmlBillServiceTable += '</tr><tr>';
				that.htmlBillServiceTable += '<td>- ' +item.serviceName + '</td>';
				that.htmlBillServiceTable += '<td class="text-right">' +(item.realPrice * item.count).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
				that.htmlBillServiceTable += '</tr>';

				des = item.description;
				shoe++;
			}
			else{
				that.htmlBillServiceTable += '<tr>';
				that.htmlBillServiceTable += '<td>- ' +item.serviceName + '</td>';
				that.htmlBillServiceTable += '<td class="text-right">' +(item.realPrice * item.count).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
				that.htmlBillServiceTable += '</tr>';
			}

		}
	}

	this.convertTimestamp = function(time){
		let d = new Date(time);
		return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}
	this.convertTimestampHT = function(time){
		let d = new Date(time);
		return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	}

	this.convertMoney = function (money) {
		return money.toLocaleString('vi', {style : 'currency', currency : 'VND'});
	}

	// Sự kiện
	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oTableService = ControlHelper.Datatable.Init('Grid02', 10, true);
		that.oDialog = new PopupDialog(reload);

		that.initPage();

		function reload() {

		}

		$('#Grid01 tbody').on('click', 'tr', function () {
			that.oOrderService.orderId = $(this).find('.rowID').val();
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');

			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				that.bindGridService();
			}
			return true;
		});

		$('#Grid01').on('click', '.btnStatus', function () {
			var id = $(this).data('id');
			if(!id){
				return ;
			}
			if (confirm('Xác nhận chuyển trạng thái?')) {
				that.oOrder.id = id;
				that.oOrder.changeStatus();
				that.bindGrid();
			}
			return false;
		});

		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if(!id){
				return ;
			}
			if (confirm('Xác nhận hủy đơn hàng?')) {
				that.oOrder.id = id;
				that.oOrder.getById();
				that.oOrder.cancelOrder();
				that.oCustomer.phone = that.oOrder.customerPhone;
				that.oCustomer.getByPhone();
				that.oCustomer.amount -= that.oOrder.received;
				that.oCustomer.save();
				that.bindGrid();
			}
			return false;
		});

		$('#Grid02').on('click', '.btnNote', function () {
			var id = $(this).data('serviceid');
			that.oOrderService.id = id;
			let note = prompt("Vị trí để giày:",$(this).html() );
			that.oOrderService.changeNote(note);
			that.bindGridService();
		});
		$('#Grid02').on('change', '.btnStaff', function () {
			var id = $(this).data('serviceid');
			that.oStaff.id = $(this).val();
			that.oStaff.getById();
			if (confirm('Xác nhận giao dịch vụ cho '+that.oStaff.name)) {
				that.oOrderService.id = id;
				that.oOrderService.changeStaff($(this).val());
				that.bindGridService();
			}
		});

		$('#Grid01').on('click','.btnDetail', function () {
			var id = $(this).data('id');

			that.oOrder.id = id;
			that.oOrder.getById();

			that.oOrderProduct.orderId = id;
			that.oOrderProduct.getByOrder();

			that.oOrderService.orderId = id;
			that.oOrderService.getByOrder();

			that.renderBillTable();

			var url = CONFIG_APP.URL.CONTEXT + '/app/bill/rebill.html';
			that.oDialog.show('Hóa đơn', url, '52%', '700px');
		});

	});
}