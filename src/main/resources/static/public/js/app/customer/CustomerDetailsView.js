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
		that.oCustomer.id = Util.Url.getParameterByName('id');
		$('#phone').val(Util.Url.getParameterByName('phone'))
		that.bindPopup();
    }

    this.bindPopup = function(){
		that.AppTitle = that.oCustomer.id == 0? 'Thêm mới khách hàng':'Cập nhật thông tin khách hàng';
		that.lockForm(false);
		
		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oCustomer.id != 0) {
			that.oCustomer.getById();
			$('#name').val(that.oCustomer.name);
			$('#phone').val(that.oCustomer.phone);
			$('#address').val(that.oCustomer.address);
			$('#email').val(that.oCustomer.email);
			$('#note').val(that.oCustomer.note);
			$('#discount').val(that.oCustomer.discount);
			$('#ranking').val(that.oCustomer.ranking);
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
			that.oCustomer.note = $('.FORM #note').val();
			// that.oCustomer.discount = $('.FORM #discount').val();
			// that.oCustomer.ranking = $('.FORM #ranking').val();

			if(that.oCustomer.name === ''){
				alert("Tên khách hàng không được để trống");
				return;
			}
			if(that.oCustomer.phone === ''){
				alert("Số điện thoại khách hàng không được để trống");
				return;
			}

			var rs = that.oCustomer.save();
			alert(rs.MESSAGE);
			that.oCustomer = rs.RESULT;
			if(Util.Url.getParameterByName('ref')=="order")
				window.parent.oOrderView.oCustomer.id = that.oCustomer.id;
			that.lockForm(true);
		});

		$('#ranking').on('change', function () {
			let rank = $('#ranking').val();
			let discount = 0;
			if(rank == 1) discount = 3;
			else if(rank == 3) discount = 5;
			else if (rank == 3) discount = 7;
			else if (rank == 4) discount = 10;
			else{
				discount = 0;
			}

			$('#discount').val(discount);
		});


		$('.ACTIONS').on('click', '#btnClose', function () {
			// window.parent.oCustomerView.oDialog.close();

			window.parent.oOrderView.oDialog.close();
		});

	});
}