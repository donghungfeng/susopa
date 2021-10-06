var ManufacController = function(){
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Manufac';
	this.oTable = null;
	this.oDialog = null;
	this.oManufac = new Manufac();
	
	// Phương thức
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.clearForm();
	}

	that.bindForm = function(){
		that.oManufac.getById();
		$('#name').val(that.oManufac.name);
		$('#note').val(that.oManufac.note);
		$('#status').val(that.oManufac.status);
		that.onView();
	}

	that.onView = function(){
		$("#name").prop('disabled', true);
		$("#note").prop('disabled', true);
		$("#status").prop('disabled', true);
		$("#btnDelete").prop('disabled', false);
		$("#btnSave").prop('disabled', true);
		$("#btnEdit").prop('disabled', false);
		$("#btnCancel").prop('disabled', false);
	}
	that.onEdit = function(){
		$("#name").prop('disabled', false);
		$("#note").prop('disabled', false);
		$("#status").prop('disabled', false);
		$("#btnDelete").prop('disabled', true);
		$("#btnSave").prop('disabled', false);
		$("#btnEdit").prop('disabled', true);
		$("#btnCancel").prop('disabled', true);
	}

	that.clearForm = function(){
		that.oManufac.id = 0;
		$('#name').val('');
		$('#note').val('');
		$('#status').val('1');
		that.onEdit();
	}

	this.search = function(){
		that.oManufac.getAll();
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oManufac.LIST.length; i++) {
			var item = that.oManufac.LIST[i];
			var hidden = '<input type="hidden" class="rowID" value="' + item.id + '" />';
			var _status = item.status === 1 ? '<label class="label label-success">Hoạt động</label>' : '<label class="label label-danger">Khóa</label>'
			aRows.push([
				(i + 1) + hidden,
				item.name,
				item.note,
				_status,
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}

	this.validSave=function(){
		var name = $('#name').val();
		
		if (name.length < 1) {
			alert('Không được để trống tên');
			$('#name').focus();
			return false;
		}
		$('#name').focus();
		return true;
	}

	this.validDel=function(){
		if (that.oManufac.id == 0) {
			alert('Chưa chọn mục cần xóa');
			return false;
		}
		return true;
	}

    // Sự kiện
	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}

		 $('.ACTIONS').on('click', '#btnSave', function () {
			if (!that.validSave()) {
				return false;
			}
			that.oManufac.name =  $('#name').val();
			that.oManufac.note =  $('#note').val();
			that.oManufac.status =  $('#status').val();
			var rs = that.oManufac.save();
			 if(rs.CODE == "00"){
				 alert(rs.MESSAGE);
				 that.initPage();
			 }else{
				$('#name').focus();
				 alert(rs.MESSAGE);
			 }
	     });
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			if (!that.validDel()) {
				return false;
			}	

			if(!confirm('Bạn có chắc chắn muốn xóa không?')){return false;}

			var rs = that.oManufac.del();
			if(rs.CODE == "00"){
				 that.initPage();
			}
			alert(rs.MESSAGE);
	     });
		 
		 $('.ACTIONS').on('click', '#btnCancel', function () {
			that.clearForm();
			that.oTable.$('tr.selected').removeClass('selected');
	     });

		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.onEdit();
		});
		
		 $('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                that.clearForm();
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
				that.oManufac.id = $(this).find('.rowID').val();
				that.bindForm();
		   }
		   return true;
		 });
			 

	});
}