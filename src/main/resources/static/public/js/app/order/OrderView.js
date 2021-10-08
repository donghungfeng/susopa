var OrderView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Thông tin dịch vụ'
	this.oTable = null;
	this.oDialog = null;
	this.oOrder = new Order();
	this.oCustomer = new Customer();
	this.oProduct = new Product();
	this.oSerivce = new Service();
	this.oColor = new Color();
	this.oSize = new Size();
	this.oMaterial = new Material();
	this.oManufac = new Manufac();
	this.oTableProduct = null;

	this.listProduct = [];

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
		let total = 0;
		for (var i = 0; i < that.listProduct.length; i++) {
			html += '<tr>';
			var item = that.listProduct[i];
			html += '<td>' +item.item.name +' (' + item.item.code + ') ' + '</td>';
			html += '<td>' +item.item.price+'</td>';
			html += '<td><input style="width: 100%" type="number" class="btnProductSpin" value="'+item.count+'" step="1" min="0" data-id="'+i+'" /></td>';
			html += '<td>' +(item.item.price * item.count)+'</td>';
			html += '</tr>';
			total = total + item.item.price * item.count;
		}
		html += '<tr><th colspan="4" class="text-right">'+'Tổng tiền sản phẩm: '+total+'</th></tr>';
		$('#GridProduct tbody').html(html);
	}

	// Sự kiện
	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);

		that.initPage();

		function reload() {
			alert('noát nại nè');
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

		$('.ACTIONS').on('click', '#btnAddCustomer', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/customer/customerdetails?id=0';
			that.oDialog.show('Thêm mới khách hàng', url, '30%', '500px');

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

		$('#customer').on('change', function () {
			that.oCustomer.id = $('#customer').val();
			that.oCustomer.getById();
			$('#customerName').html(that.oCustomer.name);
			$('#customerPhone').html(that.oCustomer.phone);
		});


	});
}