var OrderServiceView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Danh sách dịch vụ cần thực hiện';
	this.oTable = null;
	this.oDialog = null;
	this.oOrderService = new OrderService();

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
			var item = that.oOrderService.LIST[i];
			var act = '<div class="">';
			switch (item.status) {
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
					act += '<label class="label label-primary btnStatus">Đã giao khách</label>';
					break;
				default:
			}

			act += '</div>';
			aRows.push([
				(i + 1),
				item.description,
				item.order.customerPhone,
				// item.description,
				"10/10/2021 15:30:21",
				act,
				item.note
            ]);
		}
		that.oTable.rows.add(aRows).draw();
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
			if (confirm('Xác nhận chuyển trạng thái?')) {
				that.oOrderService.id = id;
				that.oOrderService.changeStatus();
				that.bindGrid();
			}
			return false;
		});



	});
}