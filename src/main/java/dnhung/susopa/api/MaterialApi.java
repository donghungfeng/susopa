package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.MaterialService;
import dnhung.susopa.entity.MaterialEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/material")
public class MaterialApi extends BaseApi<MaterialEntity> {
    private final MaterialService materialService;

    public MaterialApi(MaterialService materialService) {
        this.materialService = materialService;
    }

    @Override
    protected BaseService<MaterialEntity> getBaseService() {
        return materialService;
    }
}
