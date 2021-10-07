var CustomerDetailsView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'Khách hàng';
	this.oTable = null;
	this.oDialog = null;
	this.oCustomer = new Customer();
    this.id = 0;

    // Phương thức
	this.initPage = function () {
		that.oCustomer.Customerid = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		if(Util.Url.getParameterByName('type') == null){
			that.AppTitle = that.oCustomer.Customerid == 0? 'Thêm mới POS profile':'Cập nhật thông tin POS profile';
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
		if (that.oCustomer.Customerid != 0) {
			that.oCustomer.getDetails();
			$('#name').val(that.oCustomer.name);
			$('#phone').val(that.oCustomer.phone);
            $('#address').val(that.oCustomer.address);
            $('#email').val(that.oCustomer.email);
            $('#discount').val(that.oCustomer.discount);
			$('#note').val(that.oCustomer.note);
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
			
			that.oCustomer.name = $('.FORM #name').val();
			that.oCustomer.phone = $('.FORM #phone').val();
			that.oCustomer.address = $('.FORM #address').val();
			that.oCustomer.email = $('.FORM #email').val();
			that.oCustomer.discount = $('.FORM #discount').val();
			that.oCustomer.note = $('.FORM #note').val();
			var rs = that.oCustomer.save();
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oCustomerView.oDialog.close(); 
		});

	});
}