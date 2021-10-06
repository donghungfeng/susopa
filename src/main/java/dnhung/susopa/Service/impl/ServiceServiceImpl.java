package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.ServiceService;
import dnhung.susopa.entity.ServiceEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.ServiceRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceServiceImpl extends BaseServiceImpl<ServiceEntity> implements ServiceService {
    private final ServiceRepository serviceRepository;

    public ServiceServiceImpl(ServiceRepository serviceRepository){
        this.serviceRepository = serviceRepository;
    }

    @Override
    protected BaseRepository<ServiceEntity> getBaseRepository() {
        return serviceRepository;
    }
}
