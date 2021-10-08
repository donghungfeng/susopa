package dnhung.susopa.repository;

import dnhung.susopa.entity.CustomerEntity;

public interface CustomerRepository extends BaseRepository<CustomerEntity> {
    CustomerEntity findByPhone(String phone);
}
