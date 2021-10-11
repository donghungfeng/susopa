package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.OrderServiceService;
import dnhung.susopa.entity.OrderServiceEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/orderservice")
public class OrderServiceApi extends BaseApi<OrderServiceEntity> {
    private final OrderServiceService orderServiceService;

    public OrderServiceApi(OrderServiceService orderServiceService) {
        this.orderServiceService = orderServiceService;
    }

    @Override
    protected BaseService<OrderServiceEntity> getBaseService() {
        return orderServiceService;
    }
}
