package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.SizeService;
import dnhung.susopa.entity.SizeEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/size")
public class SizeApi extends BaseApi<SizeEntity> {
    private final SizeService sizeService;

    public SizeApi(SizeService sizeService) {
        this.sizeService = sizeService;
    }

    @Override
    protected BaseService<SizeEntity> getBaseService() {
        return sizeService;
    }
}
