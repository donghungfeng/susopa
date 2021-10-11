package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.OrderProductService;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.OrderProductRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderProductServiceImpl extends BaseServiceImpl<OrderProductEntity> implements OrderProductService {
    private final OrderProductRepository orderProductRepository;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository){
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    protected BaseRepository<OrderProductEntity> getBaseRepository() {
        return orderProductRepository;
    }
}
