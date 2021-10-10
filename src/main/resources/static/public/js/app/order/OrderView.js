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
	this.customerPhone = "";

	this.htmlBillProductTable = "";
	this.htmlBillServiceTable = "";


	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.oCustomer.bindSelect2('#customer');
		that.oProduct.bindSelect2('#product');
		that.oSerivce.bindSelect2('#service');
		that.oColor.bindSelect('#color');
		that.oSize.bindSelect('#size');
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
		for (var i = 0; i < that.listService.length; i++) {
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
		this.total = this.totalProduct + this.totalService;
		$('#total').html(parseFloat(this.total).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
		that.moneyDiscountCustomer = that.discountCustomer*(-0.01)*that.total;
		that.moneyDiscountVoucher = that.discountVourcher*(-0.01)*that.total;
		$('#discountCustomer').html(that.moneyDiscountCustomer.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
		$('#discountVourcher').html(that.moneyDiscountVoucher.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
		this.totalAfterDiscount = this.total - that.discountCustomer*0.01*that.total - that.discountVourcher*0.01*that.total;
		$('#totalAfterDiscount').html(parseFloat(this.totalAfterDiscount).toLocaleString('vi', {style : 'currency', currency : 'VND'}));

		let returnMoney  = parseInt($('#customerPay').val()) - this.totalAfterDiscount;
		if(returnMoney < 0)
			returnMoney = 0
		$('#return').html(returnMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
	}
	this.reloadCustomer = function(){
		that.oCustomer.getById();
		$('#customerName').html(that.oCustomer.name);
		$('#customerPhone').html(that.oCustomer.phone);
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
			that.oSerivce.id = $('#service').val();
			that.oSerivce.getById();
			let check = that.listService.findIndex(e => e.item.id === that.oSerivce.entity.id);
			if(check === -1){
				let entity = {
					item: that.oSerivce.entity,
					count: 1
				}
				that.listService.push(entity);
			}
			else
				that.listService[check].count++;

			that.bindGridService();
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

		$('#exportBill').on('click', function () {
			that.renderBillTable();
			var url = CONFIG_APP.URL.CONTEXT + '/app/bill/bill.html';
			that.oBillDialog.show('Hóa đơn', url, '52%', '700px');

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


	});
}