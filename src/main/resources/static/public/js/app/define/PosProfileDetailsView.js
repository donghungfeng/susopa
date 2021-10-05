var PosProfileDetailsView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'POS profile';
	this.oTable = null;
	this.oDialog = null;
	this.oPosprofile = new Posprofile();
    this.id = 0;

    // Phương thức
	this.initPage = function () {
		that.oPosprofile.posprofileid = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		if(Util.Url.getParameterByName('type') == null){
			that.AppTitle = that.oPosprofile.posprofileid == 0? 'Thêm mới POS profile':'Cập nhật thông tin POS profile';
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
		if (that.oPosprofile.posprofileid != 0) {
			that.oPosprofile.getDetails();
			$('#code').val(that.oPosprofile.code);
			$('#name').val(that.oPosprofile.name);
			$('#bankname').val(that.oPosprofile.bankname);
            $('#bankendpoint').val(that.oPosprofile.bankendpoint);
            $('#port').val(that.oPosprofile.port);
            $('#metadata').val(that.oPosprofile.metadata);
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
			that.oPosprofile.code = $('.FORM #code').val();
			that.oPosprofile.name = $('.FORM #name').val();
			that.oPosprofile.bankname = $('.FORM #bankname').val();
            that.oPosprofile.bankendpoint = $('.FORM #bankendpoint').val();
            that.oPosprofile.port = $('.FORM #port').val();
            that.oPosprofile.metadata = $('.FORM #metadata').val();
			var rs = that.oPosprofile.save();
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnTestConnect', function () {
			var rs = that.oPosprofile.checkConnect();
			$("#labelCheckConnect").css("display", "block");
			if(rs.CODE == "00"){
				$('#result').html("<label class = 'label label-success'>Kết nối thành công</label>");
				$('#timeresponse').html("<label class = 'label label-success'>"+rs.RESULT+"ms </label>")

			}
			else{
				$('#result').html("<label class = 'label label-danger'>Kết nối thất bại</label>");
			}
		});
		
		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oPosProfileView.oDialog.close(); 
		});

	});
}