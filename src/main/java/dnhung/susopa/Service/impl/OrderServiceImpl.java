package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.OrderService;
import dnhung.susopa.entity.OrderEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl extends BaseServiceImpl<OrderEntity> implements OrderService {
    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    @Override
    protected BaseRepository<OrderEntity> getBaseRepository() {
        return orderRepository;
    }

    @Override
    public List<OrderEntity> findAllFromTime(double from, double to) {
        return this.orderRepository.findAllFromTime(from, to);
    }
}
