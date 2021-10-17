var OrderView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Thông tin dịch vụ'
	this.oTable = null;
	this.oDialog = null;
	this.oBillDialog = null;
	this.oOrder = new Order();
	this.oCustomer = new Customer();
	this.oProduct = new Product();
	this.oSerivce = new Service();
	this.oColor = new Color();
	this.oSize = new Size();
	this.oShip = new Ship();
	this.oMaterial = new Material();
	this.oManufac = new Manufac();
	this.oVourcher = new Vourcher();
	this.oTableProduct = null;

	this.listProduct = [];
	this.listService = [];

	this.totalProduct = 0;
	this.totalService = 0;
	this.total = 0;
	this.discountCustomer = 0;
	this.discountVourcher = 0;
	this.moneyDiscountVoucher = 0;
	this.moneyDiscountCustomer = 0;
	this.totalAfterDiscount = 0;
	this.totalAfterDiscountShip = 0;
	this.totalShip = 0;
	this.customerPhone = "";
	this.totalDiscount = 0;

	this.htmlBillProductTable = "";
	this.htmlBillServiceTable = "";

	this.typeShip = 1;


	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.oCustomer.bindSelect2('#customer');
		that.oProduct.bindSelect2('#product');
		that.oSerivce.bindSelect2('#service');
		that.oColor.bindSelect('#color');
		that.oSize.bindSelect('#size');
		that.oShip.bindSelect('#ship');
		that.oMaterial.bindSelect('#material');
		that.oManufac.bindSelect2('#manufac');
	}

	this.bindGridProduct = function(){
		let html = "";
		this.totalProduct = 0;
		for (var i = 0; i < that.listProduct.length; i++) {
			html += '<tr>';
			var item = that.listProduct[i];
			html += '<td>' +item.item.name +' (' + item.item.code + ') ' + '</td>';
			html += '<td>' +parseFloat(item.item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			html += '<td><input style="width: 100%" type="number" class="btnProductSpin" value="'+item.count+'" step="1" min="0" data-id="'+i+'" /></td>';
			html += '<td>' +(item.item.price * item.count).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			html += '</tr>';
			this.totalProduct = this.totalProduct + item.item.price * item.count;
		}
		html += '<tr><th colspan="4" class="text-right">'+'Tổng tiền sản phẩm: '+parseFloat(this.totalProduct).toLocaleString('vi', {style : 'currency', currency : 'VND'})+'</th></tr>';
		$('#GridProduct tbody').html(html);
		this.reloadTotal();
	}

	this.bindGridService = function(){
		let html = "";
		this.totalService = 0;
		let des = "";
		for (var i = 0; i < that.listService.length; i++) {
			if(des !== that.listService[i].description){
				html += '<tr><td colspan="4" style="font-style: italic;font-weight: bold">'+that.listService[i].description+'</td></tr>';
				des = that.listService[i].description;
			}
			html += '<tr>';
			var item = that.listService[i];
			html += '<td>' +item.item.name +' (' + item.item.code + ') ' + '</td>';
			html += '<td>' +parseFloat(item.item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			html += '<td><input style="width: 100%" type="number" class="btnServiceSpin" value="'+item.count+'" step="1" min="0" data-id="'+i+'" /></td>';
			html += '<td>' +(item.item.price * item.count).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';


			html += '</tr>';
			this.totalService = this.totalService + item.item.price * item.count;
		}
		html += '<tr><th colspan="4" class="text-right">'+'Tổng tiền sản phẩm: '+parseFloat(this.totalService).toLocaleString('vi', {style : 'currency', currency : 'VND'})+'</th></tr>';
		$('#GridService tbody').html(html);

		this.reloadTotal();
	}

	this.reloadTotal = function(){
		that.total = that.totalProduct + that.totalService;
		$('#total').html(parseFloat(this.total).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
		that.moneyDiscountCustomer = that.discountCustomer*(-0.01)*that.total;
		that.moneyDiscountVoucher = that.discountVourcher*(-0.01)*that.total;
		that.totalDiscount = that.discountVourcher + that.discountCustomer;
		$('#discountCustomer').html(that.moneyDiscountCustomer.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
		$('#discountVourcher').html(that.moneyDiscountVoucher.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
		that.totalAfterDiscount = that.total + that.moneyDiscountCustomer + that.moneyDiscountVoucher;
		that.totalAfterDiscountShip = that.totalAfterDiscount + that.totalShip

		$('#totalAfterDiscount').html(parseFloat(this.totalAfterDiscountShip).toLocaleString('vi', {style : 'currency', currency : 'VND'}));



		let returnMoney  = parseInt($('#customerPay').val()) - this.totalAfterDiscountShip;
		if(returnMoney < 0)
			returnMoney = 0
		$('#return').html(returnMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
	}
	this.reloadCustomer = function(){
		that.oCustomer.getById();

		let _rank = "";
		switch (that.oCustomer.ranking) {
			case 0:
				_rank = '<span><i class="fa fa-user"></i> Thường&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
				break;
			case 1:
				_rank = '<span class="label" style="background-color: black"><i class="fa fa-user"></i> Member &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
				break;
			case 2:
				_rank = '<span class="label" style="background-color: #a6a6a6"><i class="fa fa-angle-up"></i> Bạc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
				break;
			case 3:
				_rank = '<span class="label" style="background-color: gold"><i class="fa fa-angle-double-up"></i> Vàng&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</span>';
				break;
			case 4:
				_rank = '<span class="label" style="background-color: dodgerblue"><i class="fa fa-diamond"></i> Kim cương</span>';
				break;
			default:
				_rank = "Vô hạng";
				break;
		}
		$('#customerName').html(that.oCustomer.name);
		$('#customerPhone').html(that.oCustomer.phone);

		$('#customerRank').html(_rank);
		$('#discountText').html("-" + that.oCustomer.discount + "%");
		$('#discount').html(that.oCustomer.discount*(-0.01)*that.total);
		that.discountCustomer = that.oCustomer.discount;

		that.reloadTotal();
	}

	this.renderBillTable = function(){
		that.htmlBillProductTable = "";
		that.htmlBillServiceTable = "";
		for (var i = 0; i < that.listProduct.length; i++) {
			that.htmlBillTable += '<tr>';
			var item = that.listProduct[i];
			that.htmlBillProductTable += '<td>' +item.item.name +' (' + item.item.code + ') ' + '</td>';
			that.htmlBillProductTable += '<td>' +parseFloat(item.item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			that.htmlBillProductTable += '<td>' +item.count+ '</td>';
			that.htmlBillProductTable += '<td>' +(item.item.price * item.count).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			that.htmlBillProductTable += '</tr>';
		}
		for (var i = 0; i < that.listService.length; i++) {
			that.htmlBillServiceTable += '<tr>';
			var item = that.listService[i];
			that.htmlBillServiceTable += '<td>' +item.item.name +' (' + item.item.code + ') ' + '</td>';
			that.htmlBillServiceTable += '<td>' +parseFloat(item.item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			that.htmlBillServiceTable += '<td>' +item.count+ '</td>';
			that.htmlBillServiceTable += '<td>' +(item.item.price * item.count).toLocaleString('vi', {style : 'currency', currency : 'VND'})+ '</td>';
			that.htmlBillServiceTable += '</tr>';
		}

	}


	// Sự kiện
	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.oBillDialog = new PopupDialog();

		that.initPage();

		function reload() {
			that.reloadCustomer();
		}

		$('.ACTIONS').on('click', '#btnAddProduct', function () {
			if($('#product').val() === "0") return;
			that.oProduct.id = $('#product').val();
			that.oProduct.getById();
			let check = that.listProduct.findIndex(e => e.item.id === that.oProduct.entity.id);
			if(check === -1){
				let entity = {
					item: that.oProduct.entity,
					count: 1
				}
				that.listProduct.push(entity);
			}
			else
				that.listProduct[check].count++;

			that.bindGridProduct();
		});
		$('.ACTIONS').on('click', '#btnAddService', function () {
			if($('#service').val() === "0") return;
			that.oSerivce.id = $('#service').val();
			that.oSerivce.getById();
			let entity = {
				item: that.oSerivce.entity,
				description: $('#description').val(),
				count: 1
			}
			that.listService.push(entity);

			console.log(that.listService);
			that.bindGridService();
		});
		$('.ACTIONS').on('click', '#btnAddShip', function () {
			if($('#ship').val() === "0") return;
			that.oShip.id = $('#ship').val();
			that.oShip.getById();

			$('#shipName').html(that.oShip.name);

			if(that.typeShip == 1){
				$('#totalShip').html(that.oShip.oneWay.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
				that.totalShip = that.oShip.oneWay;
			}
			if(that.typeShip == 2){
				$('#totalShip').html(that.oShip.twoWay.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
				that.totalShip = that.oShip.twoWay;
			}

			that.reloadTotal();
		});

		$('.ACTIONS').on('click', '#btnAddCustomer', function () {

			var url = CONFIG_APP.URL.CONTEXT + '/app/customer/customerdetails?id=0&phone='+that.customerPhone+'&ref=order';
			that.oDialog.show('Thêm mới khách hàng', url, '30%', '500px');

		});
		$('.ACTIONS').on('click', '#addVourcher', function () {
			that.oVourcher.code = $('#vourcher').val();
			if(that.oVourcher.code == ''){
				$('#vourcherText').html('');
				that.discountVourcher = 0;
				that.reloadTotal();
				return;
			}
			that.oVourcher.getByCode();

			if(!that.oVourcher.entity){
				alert("Không tìm thấy vourcher!");
			}
			else{
				if(that.oVourcher.entity.usage == 0 ){
					alert("vourcher hết hạn sử dụng!");
					that.discountVourcher = 0;
					$('#vourcherText').html('<i><b>'+'-0%'+'</b></i>');
				}
				else{
					that.discountVourcher = that.oVourcher.entity.percent;
					$('#vourcherText').html('<i><b>'+'-'+that.oVourcher.entity.percent+'%'+'</b></i>');

				}
				that.reloadTotal();
			}



		});

		$('#GridProduct').on('change', '.btnProductSpin', function () {
			let count = parseInt($(this).val());
			let index = parseInt($(this).data('id'));
			if(parseInt($(this).val()) === 0){
				that.listProduct.splice(index,1);
			}
			else
				that.listProduct[index].count = count;
			that.bindGridProduct();
		});

		$('#GridService').on('change', '.btnServiceSpin', function () {
			let count = parseInt($(this).val());
			let index = parseInt($(this).data('id'));
			if(parseInt($(this).val()) === 0){
				that.listService.splice(index,1);
			}
			else
				that.listService[index].count = count;
			that.bindGridService();
		});

		$('#customer').on('change', function () {
			that.oCustomer.id = $('#customer').val();
			that.reloadCustomer();

		});

		$('#material').on('change', function () {
			that.oMaterial.id = $('#material').val();
			that.oMaterial.getById();
			$('#description').val($('#description').val()+"Chất liệu: "+that.oMaterial.name+";  ");

		});
		$('#size').on('change', function () {
			that.oSize.id = $('#size').val();
			that.oSize.getById();
			$('#description').val($('#description').val()+"Size: "+that.oSize.name+";  ");

		});
		$('#manufac').on('change', function () {
			that.oManufac.id = $('#manufac').val();
			that.oManufac.getById();
			$('#description').val($('#description').val()+"Hãng: "+that.oManufac.name+";   ");
		});
		$('#color').on('change', function () {
			that.oColor.id = $('#color').val();
			that.oColor.getById();
			$('#description').val($('#description').val()+"Màu: "+that.oColor.name+";   ");
		});


		$('#customerPay').on('keyup', function () {
			$('#customerPayText').html(parseFloat($('#customerPay').val()).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
			that.reloadTotal();
		});
		$('#customerPayAll').on('click', function () {
			$('#customerPayText').html(that.totalAfterDiscount.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
			$('#customerPay').val(that.totalAfterDiscount);
			that.reloadTotal();
		});

		$('#shipOneWay').on('click', function () {
			that.typeShip = 1;
		});
		$('#shipTwoWay').on('click', function () {
			that.typeShip = 2;
		});

		$('#customer').select2({
			language: {
				noResults: function(term) {
					console.log(event.target.value);
					typed = event.target.value;
					if (typed.length>0){
						$("span.select2-container").addClass ('select2-container--focus');
						that.customerPhone=typed;
					}
				}
			}
		});

		$('.btn-toggle').click(function() {
			$(this).find('.btn').toggleClass('active');
			if ($(this).find('.btn-primary').size()>0) {
				$(this).find('.btn').toggleClass('btn-primary');
			}
			$(this).find('.btn').toggleClass('btn-default');

		});


		$('#exportBill').on('click', function () {
			if(that.oCustomer.id === 0){
				alert("Chưa chọn khách hàng!");
				return;
			}

			let date = new Date();

			let code = "SU" + date.getDate() + (date.getMonth()+1) + "KH" +that.oCustomer.id + (that.oCustomer.orders+1);
			that.oOrder.code = code;
			that.oOrder.amount = that.totalAfterDiscount;
			that.oOrder.received = that.totalAfterDiscount;
			that.oOrder.time = date.getTime();
			that.oOrder.customerName = that.oCustomer.name;
			that.oOrder.customerPhone = that.oCustomer.phone;
			that.oOrder.countService = that.listService.length;
			that.oOrder.countProduct = that.listProduct.length;
			that.oOrder.status = "CREATED";

			let oOrderEntity = that.oOrder.save().RESULT;
			console.log(that.oOrder);

			that.oCustomer.amount += that.totalAfterDiscount;
			that.oCustomer.orders ++;

			that.oCustomer.save();

			for (let i = 0;i<that.listProduct.length;i++){
				let item = that.listProduct[i];
				let oOderProduct = new OrderProduct();
				oOderProduct.time = date.getTime();
				oOderProduct.order = oOrderEntity;
				oOderProduct.status = 0;
				oOderProduct.note = '';
				oOderProduct.price = item.item.price - item.item.price*that.totalDiscount*0.01;
				oOderProduct.count = item.count;
				oOderProduct.productCode = item.item.code;
				oOderProduct.productName = item.item.name;

				oOderProduct.save();
			}

			for (let i = 0;i<that.listService.length;i++){
				let item = that.listService[i];
				let oOrderService = new OrderService();
				oOrderService.time = date.getTime();
				oOrderService.order = oOrderEntity;
				oOrderService.status = 0;
				oOrderService.note = '';
				oOrderService.price = item.item.price - item.item.price*that.totalDiscount*0.01;
				oOrderService.count = item.count;
				oOrderService.description = item.description;
				oOrderService.serviceCode = item.item.code;
				oOrderService.serviceName = item.item.name;
				oOrderService.note = '';

				oOrderService.save();
			}

			// that.renderBillTable();
			// var url = CONFIG_APP.URL.CONTEXT + '/app/bill/bill.html';
			// that.oBillDialog.show('Hóa đơn', url, '52%', '700px');

		});



	});
}