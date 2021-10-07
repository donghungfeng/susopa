var ServiceDetailsView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'Dịch vụ';
	this.oTable = null;
	this.oDialog = null;
	this.oService = new Service();
    this.id = 0;

    // Phương thức
	this.initPage = function () {
		that.oService.id = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		that.AppTitle = that.oService.id == 0? 'Thêm mới dịch vụ':'Cập nhật thông tin dịch vụ';
		that.lockForm(false);

		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oService.id != 0) {
			that.oService.getById();
			$('#code').val(that.oService.code);
			$('#name').val(that.oService.name);
			$('#price').val(that.oService.price);
            $('#discount').val(that.oService.discount);
			$('#description').val(that.oService.description);
			$('#note').val(that.oService.note);
		}
		
    }
    
    this.lockForm = function(type){
		$(".FORM :input").attr("disabled", type);
		$(".ACTIONS :button").attr("disabled", type);
    }

    // Sự kiện
	$(document).ready(function () {

		that.initPage();

		$('.ACTIONS').on('click', '#btnSave', function () {
			that.oService.code = $('.FORM #code').val();
			that.oService.name = $('.FORM #name').val();
			that.oService.price = $('.FORM #price').val();
			that.oService.discount = $('.FORM #discount').val();
			that.oService.description = $('.FORM #description').val();
			that.oService.note = $('.FORM #note').val();
			var rs = that.oService.save();

			alert(rs.MESSAGE);
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oServiceView.oDialog.close(); 
		});

	});
}