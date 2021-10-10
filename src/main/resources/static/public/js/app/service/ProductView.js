var ProductView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Thông tin sản phẩm';
	this.oTable = null;
	this.oDialog = null;
	this.oProduct = new Product();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		that.oProduct.getAll();

		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < that.oProduct.LIST.length; i++) {
			var item = that.oProduct.LIST[i];
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-info btnEdit" data-id="'+ item.id +'"><i class="fa fa-edit"></i></button>';
			act += '<button class="btn btn-danger btnDel" data-id="'+ item.id +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';
			let _price = parseFloat(item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'});
			_price = '<span class="label label-success">'+_price+'</span>';
			
			aRows.push([
				(i + 1),
				item.code,
				item.name,
				_price,
				item.discount+"%",
				item.note,
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
			var url = CONFIG_APP.URL.CONTEXT + '/app/service/productdetails?id=' + id;
			that.oDialog.show('Sửa sản phẩm', url, '50%', '600px');
			return false;
		});

		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if (confirm('Bạn có chắc chắn xóa sản phẩm này không?')) {
				that.oProduct.id = id;
				var rs = that.oProduct.del();
			}
			that.bindGrid();
			return false;
		});

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/service/productdetails?id=0';
			that.oDialog.show('Thêm mới sản phẩm', url, '50%', '600px');
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