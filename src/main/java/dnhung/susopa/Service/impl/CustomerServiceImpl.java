package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.CustomerService;
import dnhung.susopa.entity.CustomerEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl extends BaseServiceImpl<CustomerEntity> implements CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    protected BaseRepository<CustomerEntity> getBaseRepository() {
        return customerRepository;
    }
}
