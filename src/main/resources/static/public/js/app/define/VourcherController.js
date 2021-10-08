var VourcherController = function(){
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Vourcher';
	this.oTable = null;
	this.oDialog = null;
	this.oVourcher = new Vourcher();
	
	// Phương thức
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.clearForm();
	}

	that.bindForm = function(){
		that.oVourcher.getById();
		$('#code').val(that.oVourcher.code);
		$('#type').val(that.oVourcher.type);
		$('#percent').val(that.oVourcher.percent);
		$('#money').val(that.oVourcher.money);
		$('#usage').val(that.oVourcher.usage);
		$('#outdate').val(that.oVourcher.outdate);
		$('#note').val(that.oVourcher.note);

		that.onView();
	}

	that.onView = function(){
		$("#code").prop('disabled', true);
		$("#type").prop('disabled', true);
		$("#percent").prop('disabled', true);
		$("#money").prop('disabled', true);
		$("#usage").prop('disabled', true);
		$("#outdate").prop('disabled', true);
		$("#note").prop('disabled', true);
		$("#btnDelete").prop('disabled', false);
		$("#btnSave").prop('disabled', true);
		$("#btnEdit").prop('disabled', false);
		$("#btnCancel").prop('disabled', false);
	}
	that.onEdit = function(){
		$("#code").prop('disabled', false);
		$("#type").prop('disabled', false);
		$("#percent").prop('disabled', false);
		$("#money").prop('disabled', false);
		$("#usage").prop('disabled', false);
		$("#outdate").prop('disabled', false);
		$("#note").prop('disabled', false);
		$("#btnDelete").prop('disabled', true);
		$("#btnSave").prop('disabled', false);
		$("#btnEdit").prop('disabled', true);
		$("#btnCancel").prop('disabled', true);
	}

	that.clearForm = function(){
		that.oVourcher.id = 0;
		$('#code').val('');
		$('#type').val('MONEY');
		$('#percent').val('0');
		$('#money').val('0');
		$('#usage').val('0');
		$('#outdate').val('');
		$('#note').val('');
		that.onEdit();
	}

	this.search = function(){
		that.oVourcher.getAll();
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oVourcher.LIST.length; i++) {
			var item = that.oVourcher.LIST[i];
			var hidden = '<input type="hidden" class="rowID" value="' + item.id + '" />';
			aRows.push([
				(i + 1) + hidden,
				item.code,
				item.type,
				item.percent,
				item.money,
				item.usage,
				item.outdate,
				item.note,
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}

	this.validSave=function(){
		return true;
	}

	this.validDel=function(){
		if (that.oVourcher.id == 0) {
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
			that.oVourcher.code =  $('#code').val();
			 that.oVourcher.type =  $('#type').val();
			 that.oVourcher.percent =  $('#percent').val();
			 that.oVourcher.money =  $('#money').val();
			 that.oVourcher.usage =  $('#usage').val();
			 that.oVourcher.outdate =  $('#outdate').val();
			that.oVourcher.note =  $('#note').val();
			var rs = that.oVourcher.save();
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

			var rs = that.oVourcher.del();
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
				that.oVourcher.id = $(this).find('.rowID').val();
				that.bindForm();
		   }
		   return true;
		 });
			 

	});
}