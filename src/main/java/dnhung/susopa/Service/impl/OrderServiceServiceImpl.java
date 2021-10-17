package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.OrderServiceService;
import dnhung.susopa.entity.OrderServiceEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.OrderServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceServiceImpl extends BaseServiceImpl<OrderServiceEntity> implements OrderServiceService {
    private final OrderServiceRepository orderServiceRepository;

    public OrderServiceServiceImpl(OrderServiceRepository orderServiceRepository){
        this.orderServiceRepository = orderServiceRepository;
    }

    @Override
    protected BaseRepository<OrderServiceEntity> getBaseRepository() {
        return orderServiceRepository;
    }

    @Override
    public List<OrderServiceEntity> findAllFromTime(double from, double to) {
        return this.orderServiceRepository.findAllFromTime(from,to);
    }
}
