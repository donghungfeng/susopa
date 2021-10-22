var Sidebar = function() {

	var that = this;
	
	this.init = function() {
		that.checkQuyenHan();
	}
	
	this.checkQuyenHan = function(){

		var aAllApp = [
			'menu_letan'
			,'menu_bacsy'
			,'menu_baocao'
			,'menu_caidat'
			,'menu_danhmuc'
		];

		var aAccAdmin = [
			'admin'
			,'DEMO.ORION'
			,'CUC.VDOCTOR'
			,'HUNG.VDOCTOR'
			,'CUONG.VDOCTOR'
			,'HUY.VDOCTOR'
			,'DAT.VDOCTOR'
			,'LEHIEU.VDOCTOR'
		];

		var aAccBacSi = [
			'TUANANH.VDOCTOR'
			,'LINH.VDOCTOR'
			,'QUANG.VDOCTOR'
			,'QDAT.VDOCTOR'
			,'OANH.VDOCTOR'
			,'MVHUNG.VDOCTOR'
			,'DUYEN.VDOCTOR'
			,'DUNG.VDOCTOR'
			,'DAO.ENTIC'
			,'GIANG.ENTIC'
			,'HIET.ENTIC'
			,'TUAN.ENTIC'
		];

		var aAccLeTan = [
			'vdoctor.letan'
			,'NMTRANG.VDOCTOR'
			,'CTNGOC.VDOCTOR'
		];

		// var aAccAdmin = [
		// 	'CUC.VDOCTOR'
		// 	,'HUNG.VDOCTOR'
		// 	,'CUONG.VDOCTOR'
		// 	,'HUY.VDOCTOR'
		// 	,'DAT.VDOCTOR'
		// ]

		var aAdminApp = [
			'menu_letan'
			,'menu_bacsy'
			,'menu_baocao'
			,'menu_caidat'
			,'menu_danhmuc'
		];

		var aAppLeTan = [
			'menu_letan'
		];

		var aAppBacSi = [
			'menu_bacsy'
		];

		// Khóa tất cả các menu
		for (let i = 0; i < aAllApp.length; i++) {
			const item = aAllApp[i];
			$('#' + item).css("display", "none");
		}

		// lấy tài khoản
		const oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
		if (!oAUTH) {
			AUTH.logout();
		}
		var username = oAUTH.UserName;
		// Tài khoản admin
		for (let i = 0; i < aAccAdmin.length; i++) {
			const item = aAccAdmin[i];
			if (item == username) {
				for (let j = 0; j < aAdminApp.length; j++) {
					const item1 = aAdminApp[j];
					$('#' + item1).css("display", "block");
				}
			}
		}

		// Tài khoản lễ tân
		for (let i = 0; i < aAccLeTan.length; i++) {
			const item = aAccLeTan[i];
			if (item == username) {
				for (let j = 0; j < aAppLeTan.length; j++) {
					const item1 = aAppLeTan[j];
					$('#' + item1).css("display", "block");
				}
			}
		}

		// Tài khoản bác sĩ
		for (let i = 0; i < aAccBacSi.length; i++) {
			const item = aAccBacSi[i];
			if (item == username) {
				for (let j = 0; j < aAppBacSi.length; j++) {
					const item1 = aAppBacSi[j];
					$('#' + item1).css("display", "block");
				}
			}
		}
	}
     $(function(){
		 that.init();
 	})	
}