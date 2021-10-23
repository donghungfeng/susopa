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
		that.oProduct.id = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		that.AppTitle = that.oProduct.id == 0? 'Thêm mới sản phẩm':'Cập nhật thông tin sản phẩm';
		that.lockForm(false);
		
		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oProduct.id != 0) {
			that.oProduct.getById();
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

			if(that.oProduct.code === ''){
				alert("Mã sản phẩm không được để trống");
				return;
			}
			if(that.oProduct.name === ''){
				alert("Tên sản phẩm không được để trống");
				return;
			}
			var rs = that.oProduct.save();
			alert(rs.MESSAGE);
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oProductView.oDialog.close(); 
		});

	});
}