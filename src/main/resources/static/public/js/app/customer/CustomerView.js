var CustomerView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Danh sách khách hàng';
	this.oTable = null;
	this.oDialog = null;
	this.oCustomer = new Customer();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		that.oCustomer.getAll();

		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < that.oCustomer.LIST.length; i++) {
			var item = that.oCustomer.LIST[i];
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-info btnEdit" data-id="'+ item.id +'"><i class="fa fa-edit"></i></button>';
			act += '<button class="btn btn-danger btnDel" data-id="'+ item.id +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';
			let _amount = parseFloat(item.amount).toLocaleString('vi', {style : 'currency', currency : 'VND'});
			_amount = '<span class="label label-success">'+_amount+'</span>';
			var _rank = "";
			switch (item.ranking) {
				case 0:
					_rank = '<span><i class="fa fa-user"></i> Thường&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
					break;
				case 1:
					_rank = '<span class="label" style="background-color: black"><i class="fa fa-user"></i> Member &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
					break;
				case 2:
					_rank = '<span class="label" style="background-color: #a6a6a6"><i class="fa fa-angle-up"></i> Bạc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
					break;
				case 3:
					_rank = '<span class="label" style="background-color: gold"><i class="fa fa-angle-double-up"></i> Vàng&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</span>';
					break;
				case 4:
					_rank = '<span class="label" style="background-color: dodgerblue"><i class="fa fa-diamond"></i> Kim cương</span>';
					break;
				default:
					_rank = "Vô hạng";
					break;
			}
			aRows.push([
				(i + 1),
				item.name,
				item.phone,
				item.address,
				item.email,
				item.orders,
				_amount,
				_rank,
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

		$('#Grid01').on('click', '.btnEdit', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/customer/customerdetails?id=' + id;
			that.oDialog.show('Sửa POS profile', url, '30%', '500px');
			return false;
		});

		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if (confirm('Bạn có chắc chắn xóa khách hàng này không?')) {
				that.oCustomer.id = id;
				var rs = that.oCustomer.del();
			}
			that.bindGrid();
			return false;
		});

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/customer/customerdetails?id=0';
			that.oDialog.show('Thêm mới khách hàng', url, '30%', '500px');
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