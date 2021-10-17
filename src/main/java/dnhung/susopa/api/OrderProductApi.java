package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.OrderProductService;
import dnhung.susopa.entity.OrderProductEntity;
import dnhung.susopa.model.BaseResponse;
import dnhung.susopa.model.Time;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/time")
    public BaseResponse create(@RequestBody Time t){
        return new BaseResponse("00","Lấy thành công", this.orderProductService.findAllFromTime(t.getFrom(),t.getTo()));
    }
}
