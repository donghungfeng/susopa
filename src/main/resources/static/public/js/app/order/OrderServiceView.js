var OrderServiceView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Danh sách dịch vụ cần thực hiện';
	this.oTable = null;
	this.oDialog = null;
	this.oOrderService = new OrderService();
	this.oOrder = new Order();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		that.oOrderService.getAll();

		that.oTable.clear().draw();
		var aRows = [];
		console.log(that.oOrderService.LIST);
		for (var i = 0; i < that.oOrderService.LIST.length; i++) {
			var item = that.oOrderService.LIST[i].order;
			var act = '<div class="">';
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
			aRows.push([
				(i + 1),
				item.code,
				item.customerName + " ("+ item.customerPhone+") ",
				item.countProduct,
				item.countService,
				that.convertMoney(item.amount),
				that.convertTimestamp(item.time),
				that.convertTimestamp(item.expirationTime),
				act,
            ]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.convertTimestamp = function(time){
		let d = new Date(time);
		return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}

	this.convertMoney = function (money) {
		return money.toLocaleString('vi', {style : 'currency', currency : 'VND'});
	}

	// Sự kiện
	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);

		that.initPage();

		function reload() {
			that.bindGrid();
		}

		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
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
				that.oOrder.cancelOrder();
				that.bindGrid();
			}
			return false;
		});

		$('#Grid01').on('click', '.btnNote', function () {
			var id = $(this).data('id');
			that.oOrderService.id = id;
			let note = prompt("Vị trí để giày:",$(this).html() );
			that.oOrderService.changeNote(note);
			that.bindGrid();
		});



	});
}