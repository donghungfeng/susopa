package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.ShipService;
import dnhung.susopa.Service.SizeService;
import dnhung.susopa.entity.ShipEntity;
import dnhung.susopa.entity.SizeEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/ship")
public class ShipApi extends BaseApi<ShipEntity> {
    private final ShipService shipService;

    public ShipApi(ShipService shipService) {
        this.shipService = shipService;
    }

    @Override
    protected BaseService<ShipEntity> getBaseService() {
        return shipService;
    }
}
