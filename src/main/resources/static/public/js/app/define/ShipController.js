var ShipController = function(){
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Ship';
	this.oTable = null;
	this.oDialog = null;
	this.oShip = new Ship();
	
	// Phương thức
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.clearForm();
	}

	that.bindForm = function(){
		that.oShip.getById();
		$('#name').val(that.oShip.name);
		$('#note').val(that.oShip.note);
		$('#oneWay').val(that.oShip.oneWay);
		$('#twoWay').val(that.oShip.twoWay);
		that.onView();
	}

	that.onView = function(){
		$("#name").prop('disabled', true);
		$("#note").prop('disabled', true);
		$("#oneWay").prop('disabled', true);
		$("#twoWay").prop('disabled', true);
		$("#btnDelete").prop('disabled', false);
		$("#btnSave").prop('disabled', true);
		$("#btnEdit").prop('disabled', false);
		$("#btnCancel").prop('disabled', false);
	}
	that.onEdit = function(){
		$("#name").prop('disabled', false);
		$("#note").prop('disabled', false);
		$("#oneWay").prop('disabled', false);
		$("#twoWay").prop('disabled', false);
		$("#btnDelete").prop('disabled', true);
		$("#btnSave").prop('disabled', false);
		$("#btnEdit").prop('disabled', true);
		$("#btnCancel").prop('disabled', true);
	}

	that.clearForm = function(){
		that.oShip.id = 0;
		$('#name').val('');
		$('#note').val('');
		$('#oneWay').val('0');
		$('#twoWay').val('0');
		that.onEdit();
	}

	this.search = function(){
		that.oShip.getAll();
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oShip.LIST.length; i++) {
			var item = that.oShip.LIST[i];
			var hidden = '<input type="hidden" class="rowID" value="' + item.id + '" />';

			aRows.push([
				(i + 1) + hidden,
				item.name,
				item.oneWay,
				item.twoWay,
				item.note,

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
		if (that.oShip.id == 0) {
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
			that.oShip.name =  $('#name').val();
			that.oShip.note =  $('#note').val();
			that.oShip.oneWay =  $('#oneWay').val();
			that.oShip.twoWay =  $('#twoWay').val();
			var rs = that.oShip.save();
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

			var rs = that.oShip.del();
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
				that.oShip.id = $(this).find('.rowID').val();
				that.bindForm();
		   }
		   return true;
		 });
			 

	});
}