package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.ServiceService;
import dnhung.susopa.entity.ServiceEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/service")
public class ServiceApi extends BaseApi<ServiceEntity> {
    private final ServiceService serviceService;

    public ServiceApi(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @Override
    protected BaseService<ServiceEntity> getBaseService() {
        return serviceService;
    }
}
