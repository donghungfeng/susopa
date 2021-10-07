var ProductDetailsView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'Sản phẩm';
	this.oTable = null;
	this.oDialog = null;
	this.oProduct = new Product();
    this.id = 0;

    // Phương thức
	this.initPage = function () {
		that.oProduct.Productid = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		if(Util.Url.getParameterByName('type') == null){
			that.AppTitle = that.oProduct.Productid == 0? 'Thêm mới POS profile':'Cập nhật thông tin POS profile';
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
		if (that.oProduct.Productid != 0) {
			that.oProduct.getDetails();
			$('#code').val(that.oProduct.code);
			$('#name').val(that.oProduct.name);
			$('#price').val(that.oProduct.price);
            $('#discount').val(that.oProduct.discount);
			$('#note').val(that.oProduct.note);
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
			that.oProduct.code = $('.FORM #code').val();
			that.oProduct.name = $('.FORM #name').val();
			that.oProduct.price = $('.FORM #price').val();
			that.oProduct.discount = $('.FORM #discount').val();
			that.oProduct.note = $('.FORM #note').val();
			var rs = that.oProduct.save();
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oProductView.oDialog.close(); 
		});

	});
}