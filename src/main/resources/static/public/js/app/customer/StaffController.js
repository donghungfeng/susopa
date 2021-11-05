var StaffController = function(){
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Nhân viên';
	this.oTable = null;
	this.oDialog = null;
	this.oStaff = new Staff();
	
	// Phương thức
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.clearForm();
	}

	that.bindForm = function(){
		that.oStaff.getById();
		$('#name').val(that.oStaff.name);
		$('#code').val(that.oStaff.code);
		$('#phone').val(that.oStaff.phone);
		$('#note').val(that.oStaff.note);
		$('#status').val(that.oStaff.status);
		that.onView();
	}

	that.onView = function(){
		$("#phone").prop('disabled', true);
		$("#code").prop('disabled', true);
		$("#name").prop('disabled', true);
		$("#note").prop('disabled', true);
		$("#status").prop('disabled', true);
		$("#btnDelete").prop('disabled', false);
		$("#btnSave").prop('disabled', true);
		$("#btnEdit").prop('disabled', false);
		$("#btnCancel").prop('disabled', false);
	}
	that.onEdit = function(){
		$("#phone").prop('disabled', false);
		$("#code").prop('disabled', false);
		$("#name").prop('disabled', false);
		$("#note").prop('disabled', false);
		$("#status").prop('disabled', false);
		$("#btnDelete").prop('disabled', true);
		$("#btnSave").prop('disabled', false);
		$("#btnEdit").prop('disabled', true);
		$("#btnCancel").prop('disabled', true);
	}

	that.clearForm = function(){
		that.oStaff.id = 0;
		$('#phone').val('');
		$('#code').val('');
		$('#name').val('');
		$('#note').val('');
		$('#status').val('1');
		that.onEdit();
	}

	this.search = function(){
		that.oStaff.getAll();
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oStaff.LIST.length; i++) {
			var item = that.oStaff.LIST[i];
			var hidden = '<input type="hidden" class="rowID" value="' + item.id + '" />';
			var _status = item.status === 1 ? '<label class="label label-success">Hoạt động</label>' : '<label class="label label-danger">Khóa</label>'
			aRows.push([
				(i + 1) + hidden,
				item.code,
				item.name,
				item.phone,
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
		if (that.oStaff.id == 0) {
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
			that.oStaff.name =  $('#name').val();
			that.oStaff.code =  $('#code').val();
			that.oStaff.phone =  $('#phone').val();
			that.oStaff.note =  $('#note').val();
			that.oStaff.status =  $('#status').val();
			var rs = that.oStaff.save();
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

			var rs = that.oStaff.del();
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
				that.oStaff.id = $(this).find('.rowID').val();
				that.bindForm();
		   }
		   return true;
		 });
			 

	});
}