package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.CustomerService;
import dnhung.susopa.entity.CustomerEntity;
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
}
