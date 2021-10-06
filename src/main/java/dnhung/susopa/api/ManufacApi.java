package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.ManufacService;
import dnhung.susopa.entity.ManufacturerEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
    @RequestMapping("/public/manufac")
public class ManufacApi extends BaseApi<ManufacturerEntity> {
    private final ManufacService manufacService;

    public ManufacApi(ManufacService manufacService) {
        this.manufacService = manufacService;
    }

    @Override
    protected BaseService<ManufacturerEntity> getBaseService() {
        return manufacService;
    }
}
