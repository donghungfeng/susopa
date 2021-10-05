var DashboardController = function(){
    var that = this;
    var PageTitle ='HIS PAYMENT | Bảng điều khiển';
    
	this.initPage = function(){
		$(document).attr("title", PageTitle);
	}

	$(function() {
		that.initPage();
	});
}