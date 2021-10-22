package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.CustomerService;
import dnhung.susopa.entity.CustomerEntity;
import dnhung.susopa.model.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/customer")
public class CustomerApi extends BaseApi<CustomerEntity> {
    private final CustomerService customerService;

    public CustomerApi(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    protected BaseService<CustomerEntity> getBaseService() {
        return customerService;
    }

    @GetMapping("/getbyphone/{phone}")
    public BaseResponse update(@PathVariable String phone){
        return new BaseResponse("00","Lấy thành công",this.customerService.findbyphone(phone));
    }
}
