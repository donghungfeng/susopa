package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.OrderService;
import dnhung.susopa.entity.OrderEntity;
import dnhung.susopa.model.BaseResponse;
import dnhung.susopa.model.Time;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/time")
    public BaseResponse create(@RequestBody Time t){
        return new BaseResponse("00","Lấy thành công", this.orderService.findAllFromTime(t.getFrom(),t.getTo()));
    }
}
