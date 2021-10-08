package dnhung.susopa.Service;

import dnhung.susopa.entity.CustomerEntity;

public interface CustomerService extends BaseService<CustomerEntity> {
    public CustomerEntity findbyphone(String phone);
}
