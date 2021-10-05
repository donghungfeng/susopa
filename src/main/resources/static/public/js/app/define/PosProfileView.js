var PosProfileView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Cấu hình POS (POS Profile)';
	this.oTable = null;
	this.oDialog = null;
	this.oPosprofile = new Posprofile();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		var rs = that.oPosprofile.search('');
		if (rs.CODE !='00') {}
	
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < rs.RESULT.length; i++) {
			var item = rs.RESULT[i];
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-success btnCheck" data-id="'+ item.posprofileid +'"><i class="fa fa-plug"></i></button>';
			act += '<button class="btn btn-info btnEdit" data-id="'+ item.posprofileid +'"><i class="fa fa-edit"></i></button>';
			act += '<button class="btn btn-danger btnDel" data-id="'+ item.posprofileid +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';
			aRows.push([
				(i + 1),
				item.code,
				item.name,
				item.bankname,
				item.bankendpoint,
				item.port,
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
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/posprofiledetails?id=' + id;
			that.oDialog.show('Sửa POS profile', url, '30%', '500px');
			return false;
		});
		
		$('#Grid01').on('click', '.btnCheck', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/posprofiledetails?id=' + id +"&type=testconnect";
			that.oDialog.show('Kiểm tra kết nối', url, '30%', '550px');
			return false;
		});

		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if (confirm('Bạn có chắc chắn xóa POS profile này không?')) {
				var rs = that.oPosprofile.del(id);
			}
			that.bindGrid();
			return false;
		});

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/define/posprofiledetails?id=0';
			that.oDialog.show('Thêm mới POS profile', url, '30%', '500px');
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