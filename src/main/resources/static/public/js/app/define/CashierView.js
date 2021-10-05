var CashierView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Quầy thu ngân';
	this.oTable = null;
	this.oDialog = null;
	this.oCashier = new Cashier();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}
	
	this.bindGrid = function(){
		var rs = that.oCashier.search('');
		if (rs.CODE !='00') {}
	
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < rs.RESULT.length; i++) {
			var item = rs.RESULT[i];
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-success btnCheck" data-id="'+ item.cashierid +'"><i class="fa fa-plug"></i></button>';
			act += '<button class="btn btn-warning btnLock" data-id="'+ item.cashierid +'" data-status="'+ item.status +'"><i class="fa fa-lock"></i></button>';
			act += '<button class="btn btn-info btnEdit" data-id="'+ item.cashierid +'"><i class="fa fa-edit"></i></button>';
			act += '<button class="btn btn-danger btnDel" data-id="'+ item.cashierid +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';
			var stt = item.status == 1 ? '<label class="label label-success">Hoạt động</label>' : '<label class="label label-danger">Khóa</label>';
			aRows.push([
				(i + 1),
				item.code,
				item.name,
				item.ipaddress,
				'',
				stt,
				act
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
		
		$('#Grid01').on('click', '.btnLock', function () {
			var id = $(this).data('id');
			var status = $(this).data('status');
			if (status == 1) {
				if (confirm('Bạn có chắc chắn muốn khóa quầy này không? Quầy đã khóa sẽ không thể giao dịch thanh toán với POS.')) {
					var rs = that.oCashier.lock(id);
				}
			}else{
				if (confirm('Bạn có chắc chắn muốn mở khóa quầy này không?')) {
					var rs = that.oCashier.unlock(id);
				}
			}
			that.bindGrid();
			
			return false;
		});
		
		$('#Grid01').on('click', '.btnEdit', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/cashierdetails?id=' + id;
			that.oDialog.show('Sửa Quầy thu ngân', url, '30%', '300px');
			return false;
		});

		$('#Grid01').on('click', '.btnCheck', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/cashierdetails?id=' + id +"&type=testconnect";
			that.oDialog.show('Kiểm tra kết nối', url, '30%', '350px');
			return false;
		});
		
		
		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if (confirm('Bạn có chắc chắn xóa quầy này không?')) {
				var rs = that.oCashier.del(id);
			}
			that.bindGrid();
			return false;
		});

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/cashierdetails?id=0';
			that.oDialog.show('Thêm mới thu ngân', url, '30%', '300px');
		});
		
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


		
	});
}