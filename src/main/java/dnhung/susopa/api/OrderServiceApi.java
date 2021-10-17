package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.OrderServiceService;
import dnhung.susopa.entity.OrderServiceEntity;
import dnhung.susopa.model.BaseResponse;
import dnhung.susopa.model.Time;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/time")
    public BaseResponse create(@RequestBody Time t){
        return new BaseResponse("00","Lấy thành công", this.orderServiceService.findAllFromTime(t.getFrom(),t.getTo()));
    }
}
