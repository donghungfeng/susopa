package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.OrderService;
import dnhung.susopa.entity.OrderEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/order")
public class OrderApi extends BaseApi<OrderEntity> {
    private final OrderService orderService;

    public OrderApi(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    protected BaseService<OrderEntity> getBaseService() {
        return orderService;
    }
}
