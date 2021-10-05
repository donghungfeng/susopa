var Sale = function(){
    var that = this;
    this.LIST = [];
    const URL = {
		TESTSALE:'payment/sale'
    }
	
	this.orderId = $.now();
	this.hisUser = 'pmm_test';
	this.uuid = '123456';
	this.amount = 0;
	this.f1 = '';
	this.f2 = '';
	this.f3 = '';
	this.f4 = '';
	this.f5 = '';
	this.ipaddress = '';
	this.posterminalid = 0;
	this.description='TEST_SALE';
	this.checksum='';
    
    this.search = function(key){
		return DATA.get(URL.SEARCH + '/' + key);
    }
    
   
	this.testsale = function(){

		var testsale = {
			orderId:that.orderId,
			hisUser:that.hisUser,
			uuid:that.uuid,
			amount:that.amount,
			description:that.description,
			f1:that.f1,
			f2:that.f2,
			f3:that.f3,
			f4:that.f4,
			f5:that.f5,
			checksum:that.checksum,
			posterminalid:that.posterminalid
		}
		return DATA.post(URL.TESTSALE,testsale);
	}

}