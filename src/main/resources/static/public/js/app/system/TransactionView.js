var TransactionView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Log transaction';
	this.oTable = null;
	this.oExcelData = null;
	this.oDialog = null;
	this.oTransaction = new Transaction();
	this.rs = null;


	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.rs = that.oTransaction.search('');
		that.bindGrid();
		that.bindGridExcel();
	}

	this.format =  function (n, currency) {
		return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	  }

	this.bindGrid = function(){
		if (that.rs.CODE !='00') {}
		var today = new Date();
		var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = "Last refresh: " +date+' '+time;
		$("#lastrefresh").html(dateTime);
		console.log(that.rs.RESULT);
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < that.rs.RESULT.length; i++) {
			var item = that.rs.RESULT[i];
			var act = '<div class="row-actions">';
			// act += '<button class="btn btn-success btnCheck" data-id="'+ item.cashierid +'"><i class="fa fa-plug"></i></button>';
			// act += '<button class="btn btn-warning btnLock" data-id="'+ item.cashierid +'" data-status="'+ item.status +'"><i class="fa fa-lock"></i></button>';
			// act += '<button class="btn btn-info btnEdit" data-id="'+ item.cashierid +'"><i class="fa fa-edit"></i></button>';
			// act += '<button class="btn btn-danger btnDel" data-id="'+ item.cashierid +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';
			var transstatus = "";
			if(item.transstatus == "APPROVE"){
				transstatus = '<label class="label label-success">APPROVE</label>';
			}
			else if(item.transstatus == "CANCLE"){
				transstatus =  '<label class="label label-danger">CANCELED</label>';
			}
			else{
				transstatus =  '<label class="label label-warning">REQUEST</label>';
			}
			var time = '';
			if(item.time != null){
				time = item.time.substring(6, 8) + "/" + item.time.substring(4, 6) + "/"+item.time.substring(0, 4) + " " +item.time.substring(8, 10)+":"+item.time.substring(10, 12)+":"+item.time.substring(12, 14) ;
			}
			aRows.push([
				(i + 1),
				item.requestid,
				item.returncode,
				transstatus,
				item.clientid,
				item.amount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
				time,
				item.cardtype,
				item.cardno,
				item.refno,
				''
            ]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.bindGridExcel = function(){
		var table = document.getElementById('excelData');
		if (that.rs.CODE !='00') {}
		var today = new Date();
		var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = "Last refresh: " +date+' '+time;
		$("#lastrefresh").html(dateTime);
		var aRows = [];
		var html='';
		for (var i = 0; i < that.rs.RESULT.length; i++) {
			var item = that.rs.RESULT[i];
			var act = '<div class="row-actions">';
			// act += '<button class="btn btn-success btnCheck" data-id="'+ item.cashierid +'"><i class="fa fa-plug"></i></button>';
			// act += '<button class="btn btn-warning btnLock" data-id="'+ item.cashierid +'" data-status="'+ item.status +'"><i class="fa fa-lock"></i></button>';
			// act += '<button class="btn btn-info btnEdit" data-id="'+ item.cashierid +'"><i class="fa fa-edit"></i></button>';
			// act += '<button class="btn btn-danger btnDel" data-id="'+ item.cashierid +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';
			var transstatus = item.transstatus == "APPROVE" ? '<label class="label label-success">APPROVE</label>' : '<label class="label label-danger">CANCELED</label>';
			var time = '';
			if(item.time != null){
				time = item.time.substring(6, 8) + "/" + item.time.substring(4, 6) + "/"+item.time.substring(0, 4) + " " +item.time.substring(8, 10)+":"+item.time.substring(10, 12)+":"+item.time.substring(12, 14) ;
			}

			html+='<tr>';
			html= html + '<td>' + (i + 1) + '</td>';
			html= html + '<td>' + item.requestid + '</td>';
			html= html + '<td>' + item.returncode + '</td>';
			html= html + '<td>' + transstatus + '</td>';
			html= html + '<td>' + item.clientid + '</td>';
			html= html + '<td>' + item.amount + '</td>';
			html= html + '<td>' + time + '</td>';
			html= html + '<td>' + item.cardtype + '</td>';
			html= html + '<td>' + item.cardno + '</td>';
			html= html + '<td>' + item.refno + '</td>';
			html+='</tr>';
		}
		console.log(table);
		table.innerHTML = html;
	}

	// Sự kiện
	$(document).ready(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		
		that.initPage();

		function reload() {
			that.bindGrid();
			that.bindGridExcel();
		}

		$('.ACTIONS').on('click', '#btnRefresh', function () {
			setInterval(function(){ that.bindGrid() }, pathat.rseInt($('#time').val())*1000);
		});

		$('.ACTIONS').on('click', '#btnExport', function () {
			$("#excelData").table2excel({
				filename: "LogTransaction_" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
				preserveColors:true
			});
		});

		$('.ACTIONS').on('click', '#btnSearch', function () {
			var fromDate = new Date($('#fromDate').val());
			var toDate = new Date($('#toDate').val());
			that.oTransaction.fromDate = fromDate.getFullYear()+"/"+(fromDate.getMonth()+1)+"/"+fromDate.getDate() ;
			that.oTransaction.toDate = toDate.getFullYear()+"/"+(toDate.getMonth()+1)+"/"+toDate.getDate() ;
			that.rs = that.oTransaction.searchByTime();
			that.bindGrid();
			that.bindGridExcel();
		});
	});
}