package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.OrderProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/orderproduct")
public class OrderProductApi extends BaseApi<OrderProductEntity> {
    private final OrderProductService orderProductService;

    public OrderProductApi(OrderProductService orderProductService) {
        this.orderProductService = orderProductService;
    }

    @Override
    protected BaseService<OrderProductEntity> getBaseService() {
        return orderProductService;
    }
}
