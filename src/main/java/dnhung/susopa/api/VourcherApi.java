package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.VourcherService;
import dnhung.susopa.entity.VourcherEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/vourcher")
public class VourcherApi extends BaseApi<VourcherEntity> {
    private final VourcherService vourcherService;

    public VourcherApi(VourcherService vourcherService) {
        this.vourcherService = vourcherService;
    }

    @Override
    protected BaseService<VourcherEntity> getBaseService() {
        return vourcherService;
    }
}
