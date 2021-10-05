var CashierDetailsView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Quầy thu ngân';
	this.oTable = null;
	this.oDialog = null;
	this.oCashier = new Cashier();
	this.id = 0;

	// Phương thức
	this.initPage = function () {
		that.oCashier.cashierid = Util.Url.getParameterByName('id');
		that.bindPopup();
	}

	this.bindPopup = function(){
		if(Util.Url.getParameterByName('type') == null){
			that.AppTitle = that.oCashier.cashierid == 0? 'Thêm mới Quầy thu ngân':'Cập nhật thông tin quầy thu ngân';
			$(".ACTIONS #btnCheckConnect").css("display", "none");
			that.lockForm(false);
		}
		else{
			that.AppTitle = "Kiểm tra kết nối";

			$(".ACTIONS #btnSave").css("display", "none");
			$(".FORM :input").attr("disabled", true);
			$(".FORM #status").attr("disabled", true);
			$(".ACTIONS :button").attr("disabled", false);
		}

		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oCashier.cashierid != 0) {
			that.oCashier.getDetails();
			$('#code').val(that.oCashier.code);
			$('#name').val(that.oCashier.name);
			$('#ipaddress').val(that.oCashier.ipaddress);
			$('#status').val(that.oCashier.status);
		}

	}

	this.lockForm = function(type){
		$(".FORM :input").attr("disabled", type);
		$(".FORM #status").attr("disabled", type);
		$(".ACTIONS :button").attr("disabled", type);
	}


	// Sự kiện
	$(document).ready(function () {

		that.initPage();

		$('.ACTIONS').on('click', '#btnSave', function () {
			that.oCashier.code = $('.FORM #code').val();
			that.oCashier.name = $('.FORM #name').val();
			that.oCashier.ipaddress = $('.FORM #ipaddress').val();
			that.oCashier.status = $('.FORM #status').val();
			that.oCashier.posterminalid = 1;
			var rs = that.oCashier.save();
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oCashierView.oDialog.close();
		});

		$('.ACTIONS').on('click', '#btnCheckConnect', function () {
			var rs = that.oCashier.checkConnect();
			$("#labelCheckConnect").css("display", "block");
			if(rs.CODE == "00"){
				$('#result').html("<label class = 'label label-success'>Kết nối thành công</label>");
				$('#timeresponse').html("<label class = 'label label-success'>"+rs.RESULT+"ms </label>")

			}
			else{
				$('#result').html("<label class = 'label label-danger'>Kết nối thất bại</label>");
			}

		});


	});
}
