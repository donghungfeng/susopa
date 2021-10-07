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
		that.oService.Serviceid = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		if(Util.Url.getParameterByName('type') == null){
			that.AppTitle = that.oService.Serviceid == 0? 'Thêm mới POS profile':'Cập nhật thông tin POS profile';
			$(".ACTIONS #btnTestConnect").css("display", "none");
			that.lockForm(false);
		}
		else{
			that.AppTitle = "Kiểm tra kết nối";
			
			$(".ACTIONS #btnSave").css("display", "none");
			$(".FORM :input").attr("disabled", true);
			$(".ACTIONS :button").attr("disabled", false);
		}
		
		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oService.Serviceid != 0) {
			that.oService.getDetails();
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
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oServiceView.oDialog.close(); 
		});

	});
}