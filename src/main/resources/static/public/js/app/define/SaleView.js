var SaleView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Sale';
	this.oTable = null;
	this.oDialog = null;
	this.oPosterminal = new Posterminal();
	this.oHisterminal = new Histerminal();
	this.oSale = new Sale();

	// Phương thức
	this.initPage = function () {
		//that.bindPopup();
		that.oPosterminal.posterminalid = Util.Url.getParameterByName('id');
	}
	
	this.bindPopup = function(){
		
	}
	
	$(document).ready(function () {

		that.initPage();

		$('.ACTIONS').on('click', '#btnRun', function () {
			that.oPosterminal.getDetails();
			that.oSale.amount = $("#amount").val();
			that.oSale.f1 = $("#f1").val();
			that.oSale.f2 = $("#f2").val();
			that.oSale.f3 = $("#f3").val();
			that.oSale.f4 = $("#f4").val();
			that.oSale.f5 = $("#f5").val();
			that.oSale.posterminalid = that.oPosterminal.posterminalid;
			var rs = that.oSale.testsale();
			$("#message").val(rs.MESSAGE);
			$("#result").val(JSON.stringify(rs.RESULT));

			// var configList = that.oHisterminal.getDetails();

			// var log = null;
			// if(rs.CODE === "01"){
			// 	log = rs.RESULT;
			// }
			// else{
			// 	log = {error: rs.RESULT}
			// }
			// fetch(configList.RESULT.url, {
			// method: "POST",
			// body: JSON.stringify(log),
			// headers: {"Content-type": "application/json;charset=UTF-8"}
			// })
			// .then(response => response.json()) 
			// .then(json => console.log(json)); 

		});

	});
}