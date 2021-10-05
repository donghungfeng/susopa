var PosterminalView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Điểm POS thanh toán';
	this.oTable = null;
	this.oDialog = null;
	this.oPosterminal = new Posterminal();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		var rs = that.oPosterminal.search('');
		if (rs.CODE !='00') {}
	
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < rs.RESULT.length; i++) {
			var item = rs.RESULT[i];
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-success btnCheck" data-id="'+ item.posterminalid +'"><i class="fa fa-plug"></i></button>';
			act += '<button class="btn btn-warning btnLock" data-id="'+ item.posterminalid +'" data-status="'+ item.status +'"><i class="fa fa-lock"></i></button>';
			act += '<button class="btn btn-info btnEdit" data-id="'+ item.posterminalid +'"><i class="fa fa-edit"></i></button>';
			act += '<button class="btn btn-danger btnDel" data-id="'+ item.posterminalid +'"><i class="fa fa-trash"></i></button>';
			act += '<div class="dropdown center" style="display:inline">  <button aria-expanded="true" data-toggle="dropdown" class="btn btn-default"><span class="caret"></span></button>'
			+ '<ul role="menu" class="dropdown-menu dropdown-menu-right">'    
			+ '<li><a href="#" data-id="'+item.posterminalid+'" class="btnCheck"><i class="fa fa-plug"></i> Test connect</a></li>'   
			+ '<li><a href="#" data-id="'+item.posterminalid+'" class="btnSale"><i class="fa fa-list"></i> Sale</a></li>'   
			+ '<li><a href="#" data-id="'+item.posterminalid+'" class="btnVoid"><i class="fa fa-list"></i> Void</a></li>'   
			+ '<li><a href="#" data-id="'+item.posterminalid+'" class="btnSettle"><i class="fa fa-list"></i> Settle</a></li>'   
			+	'</ul>';
			act += '<div/></div>';
			var stt = item.status == 1 ? '<label class="label label-success">Hoạt động</label>' : '<label class="label label-danger">Khóa</label>';
			aRows.push([
				(i + 1),
				item.code,
				item.name,
				item.ipaddress,
				item.port,
				item.poscode,
				item.bankname,
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

		
		$('#Grid01').on('click', '.btnSale', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/sale?id=' + id;
			that.oDialog.show('Sale', url, '30%', '600px');
			return false;
		});
		$('#Grid01').on('click', '.btnVoid', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/void?id=' + id;
			that.oDialog.show('Void', url, '30%', '250px');
			return false;
		});
		$('#Grid01').on('click', '.btnSettle', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/settle?id=' + id;
			that.oDialog.show('Settle', url, '30%', '200px');
			return false;
		});

		$('#Grid01').on('click', '.btnLock', function () {
			var id = $(this).data('id');
			var status = $(this).data('status');
			if (status == 1) {
				if (confirm('Bạn có chắc chắn muốn khóa POS này không? POS đã khóa sẽ không thể kết nối thanh toán với quầy thu ngân.')) {
					var rs = that.oPosterminal.lock(id);
				}
			}else{
				if (confirm('Bạn có chắc chắn muốn mở khóa POS này không?')) {
					var rs = that.oPosterminal.unlock(id);
				}
			}
			that.bindGrid();
			
			return false;
		});

		$('#Grid01').on('click', '.btnEdit', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/posterminaldetails?id=' + id;
			that.oDialog.show('Sửa POS Terminal', url, '45%', '400px');
			return false;
		});
		
		$('#Grid01').on('click', '.btnCheck', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/posterminaldetails?id=' + id +"&type=testconnect";
			that.oDialog.show('Kiểm tra kết nối', url, '30%', '350px');
			return false;
		});

		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if (confirm('Bạn có chắc chắn xóa POS này không?')) {
				var rs = that.oPosterminal.del(id);
			}
			that.bindGrid();
			return false;
		});

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/posterminaldetails?id=0';
			that.oDialog.show('Thêm mới POS Terminal', url, '45%', '400px');
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