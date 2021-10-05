var PosterminalDetailsView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'POS Terminal';
	this.oTable = null;
	this.oDialog = null;
	this.oPosterminal = new Posterminal();
	this.oPosprofile = new Posprofile();
    this.id = 0;
    
    // Phương thức
	this.initPage = function () {
		that.oPosterminal.posterminalid = Util.Url.getParameterByName('id');
		that.bindPopup();
    }
    
    this.bindPopup = function(){
		if(Util.Url.getParameterByName('type') == null){
			that.AppTitle = that.oPosterminal.posterminalid == 0? 'Thêm mới POS Terminal':'Cập nhật thông tin POS Terminal';
			$(".ACTIONS #btnTestConnect").css("display", "none");
			that.lockForm(false);
		}
		else{
			that.AppTitle = "Kiểm tra kết nối";
			
			$(".ACTIONS #btnSave").css("display", "none");
			$(".FORM :input").attr("disabled", true);
			$(".FORM #status").attr("disabled", true);
			$(".ACTIONS :button").attr("disabled", false);
		}
		that.oPosprofile.bindSelect('#posprofileid');

		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oPosterminal.posterminalid != 0) {
			that.oPosterminal.getDetails();
			$('#code').val(that.oPosterminal.code);
			$('#name').val(that.oPosterminal.name);
			$('#ipaddress').val(that.oPosterminal.ipaddress);
			$('#status').val(that.oPosterminal.status);
			$('#port').val(that.oPosterminal.port);
			$('#posprofileid').val(that.oPosterminal.posprofileid);
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
			that.oPosterminal.code = $('.FORM #code').val();
			that.oPosterminal.name = $('.FORM #name').val();
			that.oPosterminal.ipaddress = $('.FORM #ipaddress').val();
			that.oPosterminal.status = $('.FORM #status').val();
			that.oPosterminal.port = $('.FORM #port').val();
			that.oPosterminal.posprofileid = $('.FORM #posprofileid').val();
			var rs = that.oPosterminal.save();
			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnTestConnect', function () {
			var rs = that.oPosterminal.checkConnect();
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
			window.parent.oPosterminalView.oDialog.close(); 
		});

	});
	
}