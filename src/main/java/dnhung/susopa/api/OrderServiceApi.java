package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.OrderServiceService;
import dnhung.susopa.entity.OrderServiceEntity;
import dnhung.susopa.model.BaseResponse;
import dnhung.susopa.model.Time;
import org.springframework.web.bind.annotation.*;

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
    public BaseResponse findAllByTime(@RequestBody Time t){
        return new BaseResponse("00","Lấy thành công", this.orderServiceService.findAllFromTime(t.getFrom(),t.getTo()));
    }
    @PostMapping("/grouptime")
    public BaseResponse findAllGroupByTime(@RequestBody Time t){
        return new BaseResponse("00","Lấy thành công", this.orderServiceService.findAllGroupFromTime(t.getFrom(),t.getTo()));
    }
    @GetMapping("/findbyorder/{id}")
    public BaseResponse findAllGroupByTime(@PathVariable Long id){
        return new BaseResponse("00","Lấy thành công", this.orderServiceService.findAllByOrder(id));
    }
}
